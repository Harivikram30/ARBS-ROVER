import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.functions._

object WasteAnalytics {
  def main(args: Array[String]): Unit = {
    // Initialize Spark Session
    val spark = SparkSession.builder()
      .appName("ABRS Analytics - Waste Pipeline")
      .master("local[*]")
      .getOrCreate()

    // Read the rover event logs dataset
    val data = spark.read
      .option("header", "true")
      .option("inferSchema", "true")
      .csv("sample_waste_logs.csv")

    // General Summary
    println("--- ABRS Waste Log Analytics ---")
    data.printSchema()
    data.show(5)

    // Collection Metrics
    val collectionStats = data.groupBy("collection_status")
      .count()
      .withColumnRenamed("count", "total_records")
      .orderBy(desc("total_records"))

    println("--- Collection Status Summary ---")
    collectionStats.show()

    // Predictive insights: Identify times of high waste generation
    val hourlyTrends = data.withColumn("hour", hour(col("timestamp")))
      .groupBy("hour")
      .agg(count("mission_id").alias("incidents_per_hour"))
      .orderBy(desc("incidents_per_hour"))

    println("--- Hourly Incident Trends ---")
    hourlyTrends.show()

    spark.stop()
  }
}
