import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { ACADEMIC_OVERVIEW_DATA } from "@/services/adminData";
import Badge from "@/components/ui/badge/Badge";
import { CheckCircleIcon, PieChartIcon } from "@/icons";

export default function AcademicOverviewCard() {
  const { labels, series, totalStudents, features } = ACADEMIC_OVERVIEW_DATA;

  // Chart configuration for ApexCharts Pie / Donut
  const chartOptions: ApexOptions = {
    chart: {
      type: "donut",
      fontFamily: "Outfit, sans-serif",
    },
    colors: ["#465FFF", "#12B76A", "#0BA5EC", "#F79009"],
    labels,
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "12px",
      fontFamily: "Outfit, sans-serif",
      labels: {
        colors: ["#6B7280", "#6B7280", "#6B7280", "#6B7280"],
      },
      markers: {
        size: 7,
      },
      itemMargin: {
        horizontal: 8,
        vertical: 4,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return Math.round(val) + "%";
      },
      style: {
        fontSize: "12px",
        fontFamily: "Outfit, sans-serif",
        fontWeight: "bold",
      },
      dropShadow: {
        enabled: false,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "13px",
              fontFamily: "Outfit, sans-serif",
              color: "#6B7280",
              offsetY: -5,
            },
            value: {
              show: true,
              fontSize: "24px",
              fontFamily: "Outfit, sans-serif",
              fontWeight: "bold",
              color: "#1F2A37",
              offsetY: 5,
              formatter: () => totalStudents.toLocaleString(),
            },
            total: {
              show: true,
              showAlways: true,
              label: "Total Students",
              fontSize: "12px",
              fontWeight: 500,
              color: "#6B7280",
              formatter: () => totalStudents.toLocaleString(),
            },
          },
        },
      },
    },
    stroke: {
      colors: ["#FFFFFF"],
      width: 2,
    },
    tooltip: {
      theme: "light",
      y: {
        formatter: (val: number) => `${val} Enrolled Students`,
      },
    },
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 shadow-xs dark:border-gray-800 dark:bg-white/3">
      {/* Card Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-4 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
            <PieChartIcon className="size-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900 sm:text-lg dark:text-white">
              Academic Overview & Institutional Distribution
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Departmental enrollment ratios, academic capacity benchmarks, and board standings.
            </p>
          </div>
        </div>

        <Badge color="primary" size="sm">
          Session: 1446-1447 AH &bull; Wifaq Board Affiliated
        </Badge>
      </div>

      {/* Main Grid: Left Side Pie Chart (5 Cols) + Right Side Features (7 Cols) */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
        {/* Left Side: Beautiful Pie / Donut Chart */}
        <div className="flex flex-col items-center justify-center rounded-xl border border-gray-100 bg-gray-50/50 p-4 lg:col-span-5 dark:border-gray-800 dark:bg-gray-800/30">
          <div className="w-full max-w-[340px]">
            <ReactApexChart
              options={chartOptions}
              series={series}
              type="donut"
              height={320}
            />
          </div>

          <div className="mt-2 text-center">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              Total Enrolled: <strong className="text-gray-800 dark:text-gray-200">{totalStudents.toLocaleString()} Students</strong>
            </span>
          </div>
        </div>

        {/* Right Side: Features & Key Benchmarks (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Key Academic Features & Health Indicators
            </h4>
            <span className="text-[11px] font-medium text-brand-600 dark:text-brand-400">
              Updated Live Today
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col justify-between rounded-xl border border-gray-100 bg-white p-3.5 shadow-2xs transition hover:border-brand-300 hover:shadow-xs dark:border-gray-800 dark:bg-gray-900/60 dark:hover:border-brand-500/30"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      {feature.title}
                    </span>
                    {feature.badgeText && (
                      <span className="rounded-md bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-700 dark:bg-brand-950/60 dark:text-brand-300">
                        {feature.badgeText}
                      </span>
                    )}
                  </div>
                  <h5 className="mt-1.5 text-base font-extrabold text-gray-900 dark:text-white">
                    {feature.value}
                  </h5>
                </div>
                <p className="mt-1.5 text-[11px] leading-relaxed text-gray-400 dark:text-gray-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Notice Banner below features */}
          <div className="mt-3.5 flex items-center gap-2 rounded-xl bg-success-50/70 p-2.5 text-xs text-success-800 dark:bg-success-500/10 dark:text-success-300">
            <CheckCircleIcon className="size-4 shrink-0 text-success-600 dark:text-success-400" />
            <span>
              All 4 faculties are fully operating within certified Wifaq-ul-Madaris Al-Arabia curriculum standards.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

