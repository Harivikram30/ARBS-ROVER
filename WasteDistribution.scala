import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.functions._

object WasteDistribution {
  def main(args: Array[String]): Unit = {
    val spark = SparkSession.builder()
      .appName("ABRS - Waste Distribution Analysis")
      .master("local[*]")
      .getOrCreate()

    val data = spark.read
      .option("header", "true")
      .csv("sample_waste_logs.csv")

    // Calculate total incidents per waste type
    val distribution = data.groupBy("waste_type")
      .count()
      .withColumnRenamed("count", "total_incidents")
      .orderBy(desc("total_incidents"))

    println("--- Waste Type Distribution ---")
    distribution.show()
    
    // Cross-tabulation of waste type by department
    println("--- Waste Matrix (Department vs Type) ---")
    data.stat.crosstab("department", "waste_type").show()

    spark.stop()
  }
}
