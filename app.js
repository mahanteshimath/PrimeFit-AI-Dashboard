// Application data
const appData = {
  "user_profile": {
    "user_id": "frank_forty_001",
    "name": "Frank Forty",
    "age": 42,
    "height": 175,
    "starting_weight": 95,
    "target_weight": 75,
    "current_weight": 79.6,
    "activity_level": "moderate",
    "goal": "weight_loss_and_fitness",
    "devices": ["apple_watch", "weighing_scale", "iphone"],
    "previous_sports": ["soccer", "running", "cycling", "swimming"],
    "motivation": "be_active_with_child"
  },
  "daily_activities": [
    {"date": "2025-01-08", "steps": 7420, "weight": 79.6, "resting_heart_rate": 72, "avg_heart_rate": 95, "max_heart_rate": 165, "calories_burned": 2350, "sleep_hours": 7.2, "active_minutes": 85, "distance_km": 5.9},
    {"date": "2025-01-07", "steps": 8100, "weight": 79.8, "resting_heart_rate": 71, "avg_heart_rate": 98, "max_heart_rate": 168, "calories_burned": 2420, "sleep_hours": 6.8, "active_minutes": 92, "distance_km": 6.5},
    {"date": "2025-01-06", "steps": 6850, "weight": 79.9, "resting_heart_rate": 73, "avg_heart_rate": 92, "max_heart_rate": 155, "calories_burned": 2280, "sleep_hours": 7.8, "active_minutes": 78, "distance_km": 5.5},
    {"date": "2025-01-05", "steps": 9200, "weight": 80.1, "resting_heart_rate": 70, "avg_heart_rate": 102, "max_heart_rate": 175, "calories_burned": 2580, "sleep_hours": 7.1, "active_minutes": 105, "distance_km": 7.4},
    {"date": "2025-01-04", "steps": 5940, "weight": 80.0, "resting_heart_rate": 74, "avg_heart_rate": 88, "max_heart_rate": 148, "calories_burned": 2150, "sleep_hours": 7.9, "active_minutes": 65, "distance_km": 4.8}
  ],
  "workout_sessions": [
    {"date": "2025-01-08", "workout_type": "running", "duration_minutes": 35, "intensity": "moderate", "calories_burned": 420, "notes": "Great running session today!", "enjoyment_rating": 8},
    {"date": "2025-01-07", "workout_type": "strength_training", "duration_minutes": 45, "intensity": "high", "calories_burned": 380, "notes": "Focused on upper body", "enjoyment_rating": 9},
    {"date": "2025-01-05", "workout_type": "cycling", "duration_minutes": 60, "intensity": "moderate", "calories_burned": 540, "notes": "Long bike ride in the park", "enjoyment_rating": 8},
    {"date": "2025-01-04", "workout_type": "swimming", "duration_minutes": 40, "intensity": "low", "calories_burned": 320, "notes": "Recovery swim", "enjoyment_rating": 7},
    {"date": "2025-01-02", "workout_type": "yoga", "duration_minutes": 30, "intensity": "low", "calories_burned": 150, "notes": "Flexibility and recovery", "enjoyment_rating": 8}
  ],
  "nutrition_data": [
    {"date": "2025-01-08", "calories_consumed": 2100, "protein_g": 125, "carbs_g": 220, "fat_g": 85, "water_liters": 2.8, "meals_logged": 4},
    {"date": "2025-01-07", "calories_consumed": 2250, "protein_g": 135, "carbs_g": 240, "fat_g": 95, "water_liters": 3.2, "meals_logged": 5},
    {"date": "2025-01-06", "calories_consumed": 1950, "protein_g": 115, "carbs_g": 200, "fat_g": 75, "water_liters": 2.5, "meals_logged": 3},
    {"date": "2025-01-05", "calories_consumed": 2180, "protein_g": 140, "carbs_g": 225, "fat_g": 88, "water_liters": 3.1, "meals_logged": 4},
    {"date": "2025-01-04", "calories_consumed": 2080, "protein_g": 120, "carbs_g": 210, "fat_g": 82, "water_liters": 2.9, "meals_logged": 4}
  ]
};

// Chart colors
const chartColors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B'];

// Global chart instances
let weightChart, kpiChart, workoutChart, macroChart;

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  initializeNavigation();
  initializeCharts();
  startRealTimeUpdates();
});

// Navigation functionality
function initializeNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const pages = document.querySelectorAll('.page');
  
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      const targetPage = this.getAttribute('data-page');
      
      // Update active nav item
      navItems.forEach(nav => nav.classList.remove('active'));
      this.classList.add('active');
      
      // Show target page
      pages.forEach(page => page.classList.remove('active'));
      document.getElementById(targetPage).classList.add('active');
      
      // Initialize charts for the current page
      setTimeout(() => {
        initializePageCharts(targetPage);
      }, 100);
    });
  });
}

// Initialize all charts
function initializeCharts() {
  createWeightChart();
  createKPIChart();
  createWorkoutChart();
  createMacroChart();
}

// Initialize charts for specific page
function initializePageCharts(page) {
  switch(page) {
    case 'dashboard':
      if (weightChart) weightChart.destroy();
      createWeightChart();
      break;
    case 'analytics':
      if (kpiChart) kpiChart.destroy();
      createKPIChart();
      break;
    case 'workouts':
      if (workoutChart) workoutChart.destroy();
      createWorkoutChart();
      break;
    case 'nutrition':
      if (macroChart) macroChart.destroy();
      createMacroChart();
      break;
  }
}

// Weight loss chart
function createWeightChart() {
  const ctx = document.getElementById('weightChart');
  if (!ctx) return;
  
  // Generate weight loss progression data
  const weightData = [];
  const labels = [];
  const startDate = new Date('2024-07-01');
  let currentWeight = 95;
  
  for (let i = 0; i < 25; i++) {
    const date = new Date(startDate.getTime() + (i * 7 * 24 * 60 * 60 * 1000));
    labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    
    // Simulate weight loss with some fluctuation
    currentWeight -= (0.4 + Math.random() * 0.4);
    if (i === 24) currentWeight = 79.6; // Current weight
    weightData.push(Math.round(currentWeight * 10) / 10);
  }
  
  weightChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Weight (kg)',
        data: weightData,
        borderColor: chartColors[0],
        backgroundColor: chartColors[0] + '20',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: chartColors[0],
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5
      }, {
        label: 'Target Weight',
        data: Array(25).fill(75),
        borderColor: chartColors[2],
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderDash: [5, 5],
        pointRadius: 0,
        fill: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          min: 70,
          max: 100,
          title: {
            display: true,
            text: 'Weight (kg)'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Date'
          }
        }
      }
    }
  });
}

// KPI radar chart
function createKPIChart() {
  const ctx = document.getElementById('kpiChart');
  if (!ctx) return;
  
  kpiChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Fitness Level', 'Weight Loss', 'Sleep Quality', 'Nutrition', 'Activity Level', 'Motivation'],
      datasets: [{
        label: 'Current Performance',
        data: [75, 85, 78, 82, 70, 85],
        borderColor: chartColors[0],
        backgroundColor: chartColors[0] + '30',
        borderWidth: 2,
        pointBackgroundColor: chartColors[0],
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6
      }, {
        label: 'Target Performance',
        data: [90, 90, 85, 90, 85, 90],
        borderColor: chartColors[2],
        backgroundColor: chartColors[2] + '20',
        borderWidth: 2,
        borderDash: [5, 5],
        pointBackgroundColor: chartColors[2],
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        }
      },
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          ticks: {
            stepSize: 20
          }
        }
      }
    }
  });
}

// Workout distribution chart
function createWorkoutChart() {
  const ctx = document.getElementById('workoutChart');
  if (!ctx) return;
  
  const workoutTypes = {};
  appData.workout_sessions.forEach(session => {
    workoutTypes[session.workout_type] = (workoutTypes[session.workout_type] || 0) + 1;
  });
  
  workoutChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: Object.keys(workoutTypes).map(type => type.replace('_', ' ').toUpperCase()),
      datasets: [{
        data: Object.values(workoutTypes),
        backgroundColor: chartColors.slice(0, Object.keys(workoutTypes).length),
        borderColor: '#fff',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'right'
        }
      }
    }
  });
}

// Macronutrient chart
function createMacroChart() {
  const ctx = document.getElementById('macroChart');
  if (!ctx) return;
  
  const todayNutrition = appData.nutrition_data[0];
  
  macroChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Protein', 'Carbs', 'Fat'],
      datasets: [{
        data: [todayNutrition.protein_g, todayNutrition.carbs_g, todayNutrition.fat_g],
        backgroundColor: [chartColors[0], chartColors[1], chartColors[2]],
        borderColor: '#fff',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'bottom'
        }
      }
    }
  });
}

// Real-time data updates
function startRealTimeUpdates() {
  // Simulate real-time heart rate updates
  setInterval(() => {
    const heartRateElement = document.querySelector('.live-value');
    if (heartRateElement) {
      const baseRate = 72;
      const variation = Math.floor(Math.random() * 8) - 4; // ±4 bpm
      const newRate = baseRate + variation;
      heartRateElement.textContent = `${newRate} bpm`;
    }
  }, 3000);
  
  // Simulate step counter updates
  setInterval(() => {
    const stepsElement = document.querySelector('.metric-card .metric-value');
    if (stepsElement && stepsElement.textContent.includes(',')) {
      const currentSteps = parseInt(stepsElement.textContent.replace(',', ''));
      const newSteps = currentSteps + Math.floor(Math.random() * 10);
      stepsElement.textContent = newSteps.toLocaleString();
      
      // Update progress bar
      const progressBar = stepsElement.closest('.metric-card').querySelector('.progress-fill');
      if (progressBar) {
        const progress = Math.min((newSteps / 8000) * 100, 100);
        progressBar.style.width = `${progress}%`;
      }
    }
  }, 10000);
  
  // Simulate calorie burn updates
  setInterval(() => {
    const calorieElements = document.querySelectorAll('.metric-card .metric-value');
    calorieElements.forEach(element => {
      if (element.textContent.includes('2,')) {
        const currentCalories = parseInt(element.textContent.replace(',', ''));
        const newCalories = currentCalories + Math.floor(Math.random() * 15);
        element.textContent = newCalories.toLocaleString();
        
        // Update progress bar
        const progressBar = element.closest('.metric-card').querySelector('.progress-fill');
        if (progressBar) {
          const progress = Math.min((newCalories / 2500) * 100, 100);
          progressBar.style.width = `${progress}%`;
        }
      }
    });
  }, 15000);
}

// Utility functions
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  });
}

function getIntensityColor(intensity) {
  switch(intensity) {
    case 'low': return chartColors[3];
    case 'moderate': return chartColors[1];
    case 'high': return chartColors[2];
    default: return chartColors[0];
  }
}

function generateStarRating(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
  return '★'.repeat(fullStars) + 
         (halfStar ? '☆' : '') + 
         '☆'.repeat(emptyStars);
}

// Interactive elements
document.addEventListener('DOMContentLoaded', function() {
  // Add click handlers for recommendation cards
  const recommendationCards = document.querySelectorAll('.recommendation-card');
  recommendationCards.forEach(card => {
    card.addEventListener('click', function() {
      this.style.transform = 'scale(0.98)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);
    });
  });
  
  // Add hover effects for metric cards
  const metricCards = document.querySelectorAll('.metric-card');
  metricCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.boxShadow = '';
    });
  });
  
  // Add click handlers for workout items
  const workoutItems = document.querySelectorAll('.workout-item');
  workoutItems.forEach(item => {
    item.addEventListener('click', function() {
      const workoutType = this.querySelector('.workout-type').textContent;
      const workoutDetails = this.querySelector('.workout-details span:first-child').textContent;
      
      // Simple alert for demo - in real app would open detailed view
      alert(`${workoutType}\n${workoutDetails}\n\nClick to view detailed workout analysis`);
    });
  });
  
  // Add progress bar animations
  const progressBars = document.querySelectorAll('.progress-fill, .indicator-fill, .goal-fill');
  progressBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0%';
    setTimeout(() => {
      bar.style.width = width;
    }, 500);
  });
});

// Notification system (simulated)
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--color-${type === 'success' ? 'success' : type === 'error' ? 'error' : 'info'});
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    font-weight: 500;
    max-width: 300px;
    opacity: 0;
    transform: translateX(100%);
    transition: all 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.opacity = '1';
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Demo notifications
setTimeout(() => {
  showNotification('Welcome back, Frank! 🎉', 'success');
}, 2000);

setTimeout(() => {
  showNotification('Goal reminder: 580 more steps to reach your daily target! 🚶‍♂️', 'info');
}, 15000);

// Advanced features - data export simulation
function exportData() {
  const data = {
    profile: appData.user_profile,
    activities: appData.daily_activities,
    workouts: appData.workout_sessions,
    nutrition: appData.nutrition_data,
    exported_at: new Date().toISOString()
  };
  
  const dataStr = JSON.stringify(data, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  
  const exportFileDefaultName = 'primefit_data.json';
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
  
  showNotification('Data exported successfully! 📊', 'success');
}

// Add export button (hidden by default, can be shown for demo)
const exportButton = document.createElement('button');
exportButton.textContent = 'Export Data';
exportButton.className = 'btn btn--secondary';
exportButton.style.cssText = `
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  opacity: 0.7;
`;
exportButton.addEventListener('click', exportData);
document.body.appendChild(exportButton);

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
  if (e.altKey) {
    switch(e.key) {
      case '1':
        document.querySelector('[data-page="dashboard"]').click();
        break;
      case '2':
        document.querySelector('[data-page="analytics"]').click();
        break;
      case '3':
        document.querySelector('[data-page="workouts"]').click();
        break;
      case '4':
        document.querySelector('[data-page="nutrition"]').click();
        break;
      case '5':
        document.querySelector('[data-page="insights"]').click();
        break;
    }
  }
});

// Window resize handler for charts
window.addEventListener('resize', function() {
  if (weightChart) weightChart.resize();
  if (kpiChart) kpiChart.resize();
  if (workoutChart) workoutChart.resize();
  if (macroChart) macroChart.resize();
});

// Service worker registration (for offline functionality)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(console.error);
}

console.log('PrimeFit App Initialized Successfully! 🎯');
console.log('Use Alt+1-5 for quick navigation between pages');
console.log('Real-time data updates are active');