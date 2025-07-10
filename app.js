// PrimeFit Dashboard JavaScript
// Tab Navigation Handling, ChartJS Data, and Simulated Real-time Updates

// -- Tab Navigation --
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons & tabs
    tabButtons.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));

    // Add active class to clicked button & corresponding content
    btn.classList.add('active');
    const target = btn.getAttribute('data-tab');
    document.getElementById(target).classList.add('active');
  });
});

// -- Chart.js Configurations --

// Weekly Activity Summary (Steps, Exercise Minutes)
const weeklyCtx = document.getElementById('weeklyActivityChart');
if (weeklyCtx) {
  const weeklyActivityChart = new Chart(weeklyCtx, {
    type: 'bar',
    data: {
      labels: ['Wk22', 'Wk23', 'Wk24', 'Wk25', 'Wk26'],
      datasets: [
        {
          label: 'Steps',
          data: [10800, 11000, 11200, 11400, 11500],
          backgroundColor: '#1fb8cd',
          borderRadius: 6,
          yAxisID: 'y',
        },
        {
          label: 'Exercise Minutes',
          data: [310, 315, 320, 325, 330],
          backgroundColor: '#5d878f',
          borderRadius: 6,
          yAxisID: 'y1',
        }
      ]
    },
    options: {
      responsive: true,
      interaction: { mode: 'index', intersect: false },
      scales: {
        y: {
          type: 'linear',
          position: 'left',
          grid: { color: 'rgba(255,255,255,0.1)' },
          ticks: { color: '#f8fafc' }
        },
        y1: {
          type: 'linear',
          position: 'right',
          grid: { drawOnChartArea: false },
          ticks: { color: '#f8fafc' }
        },
        x: {
          ticks: { color: '#f8fafc' },
          grid: { color: 'rgba(255,255,255,0.05)' }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: '#f8fafc'
          }
        }
      }
    }
  });
}

// Monthly Trends Chart (Weight vs BMI)
const monthlyCtx = document.getElementById('monthlyTrendsChart');
if (monthlyCtx) {
  const monthlyTrendsChart = new Chart(monthlyCtx, {
    type: 'line',
    data: {
      labels: ['Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [
        {
          label: 'Weight (lbs)',
          data: [155, 150, 147, 145, 143],
          borderColor: '#32b8c6',
          backgroundColor: 'rgba(50, 184, 198, 0.2)',
          tension: 0.3,
          fill: true,
          pointRadius: 4
        },
        {
          label: 'BMI',
          data: [24.1, 23.3, 22.8, 22.5, 22.4],
          borderColor: '#22c55e',
          backgroundColor: 'rgba(34, 197, 94, 0.2)',
          tension: 0.3,
          fill: true,
          pointRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          ticks: { color: '#f8fafc' },
          grid: { color: 'rgba(255,255,255,0.1)' }
        },
        x: {
          ticks: { color: '#f8fafc' },
          grid: { color: 'rgba(255,255,255,0.05)' }
        }
      },
      plugins: {
        legend: {
          labels: { color: '#f8fafc' }
        }
      }
    }
  });
}

// Trend Analysis Chart (Heart Rate & Steps)
const trendCtx = document.getElementById('trendAnalysisChart');
if (trendCtx) {
  const trendAnalysisChart = new Chart(trendCtx, {
    type: 'line',
    data: {
      labels: ['Wk22', 'Wk23', 'Wk24', 'Wk25', 'Wk26'],
      datasets: [
        {
          label: 'Resting HR',
          data: [58, 58, 57, 57, 56],
          borderColor: '#ef4444',
          backgroundColor: 'rgba(239, 68, 68, 0.2)',
          tension: 0.3,
          fill: true,
          yAxisID: 'y',
          pointRadius: 4
        },
        {
          label: 'Daily Steps',
          data: [10800, 11000, 11200, 11400, 11500],
          borderColor: '#0ea5e9',
          backgroundColor: 'rgba(14, 165, 233, 0.2)',
          tension: 0.3,
          fill: true,
          yAxisID: 'y1',
          pointRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      interaction: { mode: 'index', intersect: false },
      scales: {
        y: {
          type: 'linear',
          position: 'left',
          ticks: { color: '#f8fafc' },
          grid: { color: 'rgba(255,255,255,0.1)' }
        },
        y1: {
          type: 'linear',
          position: 'right',
          ticks: { color: '#f8fafc' },
          grid: { drawOnChartArea: false }
        },
        x: {
          ticks: { color: '#f8fafc' },
          grid: { color: 'rgba(255,255,255,0.05)' }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: '#f8fafc'
          }
        }
      }
    }
  });
}

// -- Simulated Real-time Updates (Heart Rate) --
function simulateHeartRate() {
  const heartRateEl = document.getElementById('heart-rate');
  if (!heartRateEl) return;

  let base = 56;
  setInterval(() => {
    // simulate slight random fluctuation ±2 bpm
    const variation = Math.floor(Math.random() * 5) - 2;
    const newRate = base + variation;
    heartRateEl.textContent = newRate;
  }, 4000);
}

simulateHeartRate();