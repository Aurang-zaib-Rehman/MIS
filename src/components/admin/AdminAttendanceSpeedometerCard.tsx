import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import {
  MONTHLY_ATTENDANCE_STATS,
  type AttendanceMonthDetail,
} from "@/services/adminData";
import Badge from "@/components/ui/badge/Badge";
import { CalenderIcon, CheckCircleIcon, ClockIcon } from "@/icons";

export default function AdminAttendanceSpeedometerCard({
  selectedMonth,
  onMonthChange,
}: {
  selectedMonth: string;
  onMonthChange: (month: string) => void;
}) {
  const currentStat: AttendanceMonthDetail =
    MONTHLY_ATTENDANCE_STATS[selectedMonth] ||
    MONTHLY_ATTENDANCE_STATS["rabi-thani"];

  // Speedometer Semi-Radial Gauge Options
  const chartOptions: ApexOptions = {
    colors: ["#465FFF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "radialBar",
      height: 300,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: {
          size: "72%",
        },
        track: {
          background: "#E4E7EC",
          strokeWidth: "100%",
          margin: 0,
        },
        dataLabels: {
          name: {
            show: true,
            fontSize: "13px",
            fontWeight: 600,
            color: "#6B7280",
            offsetY: -10,
          },
          value: {
            fontSize: "36px",
            fontWeight: "bold",
            offsetY: -45,
            color: "#1D2939",
            formatter: function (val: number) {
              return val + "%";
            },
          },
        },
      },
    },
    fill: {
      type: "solid",
      colors: ["#465FFF"],
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Monthly Rate"],
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 shadow-xs dark:border-gray-800 dark:bg-white/3">
      {/* Top Header with Month Filter on the Right */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-4 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
            <ClockIcon className="size-6" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900 sm:text-lg dark:text-white">
              Student Attendance Speedometer & Analytics
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Institutional attendance health, daily headcount velocity, and historical monthly records.
            </p>
          </div>
        </div>

        {/* Right Top Filter: Month Selector */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-300">
            <CalenderIcon className="size-4 text-brand-500" />
            <span>Select Month:</span>
          </label>
          <select
            value={selectedMonth}
            onChange={(e) => onMonthChange(e.target.value)}
            className="rounded-xl border border-gray-300 bg-white px-3 py-1.5 text-xs font-bold text-gray-800 shadow-2xs outline-none transition focus:border-brand-500 focus:ring-1 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <option value="rabi-thani">Rabi-ul-Thani 1447 (Nov 2026)</option>
            <option value="rabi-awwal">Rabi-ul-Awwal 1447 (Oct 2026)</option>
            <option value="safar">Safar 1447 (Sep 2026)</option>
            <option value="muharram">Muharram 1447 (Aug 2026)</option>
          </select>
        </div>
      </div>

      {/* Main Grid: Speedometer (Left/Center) + Breakdown Badges (Right) */}
      <div className="mt-6 grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
        {/* Speedometer Gauge Meter (5 Cols) */}
        <div className="flex flex-col items-center justify-center rounded-xl border border-gray-100 bg-gray-50/50 p-4 lg:col-span-5 dark:border-gray-800 dark:bg-gray-800/30">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Institutional Attendance Gauge
          </span>

          <div className="relative mt-2 w-full max-w-[280px]">
            <ReactApexChart
              options={chartOptions}
              series={[currentStat.percentage]}
              type="radialBar"
              height={260}
            />
          </div>

          <div className="-mt-6 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-success-50 px-3 py-1 text-xs font-bold text-success-700 dark:bg-success-500/15 dark:text-success-400">
              <CheckCircleIcon className="size-3.5" />
              Above Target Threshold (&ge; 90%)
            </span>
            <p className="mt-1 text-[11px] text-gray-400">
              Session average for {currentStat.monthLabel}
            </p>
          </div>
        </div>

        {/* Right Side Attendance KPI Counters (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {/* 1. Total Enrolled */}
            <div className="rounded-xl border border-gray-100 bg-white p-3.5 shadow-2xs dark:border-gray-800 dark:bg-gray-900/60">
              <span className="text-xs text-gray-500 dark:text-gray-400">Total Enrolled:</span>
              <h4 className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
                {currentStat.totalEnrolled.toLocaleString()}
              </h4>
              <p className="text-[10px] text-gray-400">All registered students</p>
            </div>

            {/* 2. Today's Present */}
            <div className="rounded-xl border border-gray-100 bg-success-50/40 p-3.5 shadow-2xs dark:border-gray-800 dark:bg-success-500/10">
              <span className="text-xs text-success-700 dark:text-success-400">Today Present:</span>
              <h4 className="mt-1 text-lg font-bold text-success-700 dark:text-success-300">
                {currentStat.presentCount.toLocaleString()}
              </h4>
              <p className="text-[10px] text-success-600/80">In active classrooms</p>
            </div>

            {/* 3. Today's Absent */}
            <div className="rounded-xl border border-gray-100 bg-error-50/40 p-3.5 shadow-2xs dark:border-gray-800 dark:bg-error-500/10">
              <span className="text-xs text-error-700 dark:text-error-400">Today Absent:</span>
              <h4 className="mt-1 text-lg font-bold text-error-700 dark:text-error-300">
                {currentStat.absentCount}
              </h4>
              <p className="text-[10px] text-error-600/80">Unexcused & excused</p>
            </div>

            {/* 4. Punctuality / On-Time */}
            <div className="rounded-xl border border-gray-100 bg-brand-50/40 p-3.5 shadow-2xs dark:border-gray-800 dark:bg-brand-500/10">
              <span className="text-xs text-brand-700 dark:text-brand-400">On-Time Check-In:</span>
              <h4 className="mt-1 text-lg font-bold text-brand-700 dark:text-brand-300">
                {currentStat.onTimePercentage}%
              </h4>
              <p className="text-[10px] text-brand-600/80">Before 07:00 AM</p>
            </div>

            {/* 5. Working Days */}
            <div className="rounded-xl border border-gray-100 bg-white p-3.5 shadow-2xs dark:border-gray-800 dark:bg-gray-900/60">
              <span className="text-xs text-gray-500 dark:text-gray-400">Academic Days:</span>
              <h4 className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
                {currentStat.workingDays} Days
              </h4>
              <p className="text-[10px] text-gray-400">Active teaching days</p>
            </div>

            {/* 6. Overall Performance */}
            <div className="rounded-xl border border-gray-100 bg-blue-light-50/40 p-3.5 shadow-2xs dark:border-gray-800 dark:bg-blue-light-500/10">
              <span className="text-xs text-blue-light-700 dark:text-blue-light-400">Attendance Index:</span>
              <h4 className="mt-1 text-lg font-bold text-blue-light-700 dark:text-blue-light-300">
                Mumtaz Grade
              </h4>
              <p className="text-[10px] text-blue-light-600/80">Highest band standing</p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/70 p-3 text-xs text-gray-600 dark:border-gray-800 dark:bg-gray-800/40 dark:text-gray-300">
            <span>
              💡 <strong>Biometric Verification:</strong> Automated syncing with main gate turnstiles and Asatidha classroom attendance tablets.
            </span>
            <Badge color="primary" size="sm">
              Live Feed Active
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
