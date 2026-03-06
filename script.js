// Profile Image Long Press Feature
document.addEventListener('DOMContentLoaded', () => {
  const profilePic = document.querySelector('.profile-pic');
  const wrapper = document.querySelector('.profile-wrapper');

  if (!profilePic || !wrapper) return;

  let pressTimer;
  const PRESS_DURATION = 750; // 0.75 seconds
  const pixelDuck = 'public/pixel-duck.png';
  const coolDuck = 'public/cool-duck.png';

  function startPress(e) {
    // Prevent default context menu on long press for touch devices
    if (e.type === 'touchstart') {
      e.preventDefault(); // Prevent long-press context menu
    }

    wrapper.classList.add('loading');

    pressTimer = setTimeout(() => {
      swapImage();
      wrapper.classList.remove('loading');
      if (navigator.vibrate) navigator.vibrate(50);
    }, PRESS_DURATION);
  }

  // Block context menu (right-click / long-press menu) on profile image
  profilePic.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  function endPress() {
    clearTimeout(pressTimer);
    wrapper.classList.remove('loading');
  }

  function swapImage() {
    const currentSrc = profilePic.getAttribute('src');
    if (currentSrc.includes('pixel-duck')) {
      profilePic.src = coolDuck;
    } else {
      profilePic.src = pixelDuck;
    }
  }

  // Mouse events
  profilePic.addEventListener('mousedown', startPress);
  profilePic.addEventListener('mouseup', endPress);
  profilePic.addEventListener('mouseleave', endPress);

  // Touch events
  profilePic.addEventListener('touchstart', startPress, { passive: true });
  profilePic.addEventListener('touchend', endPress);
  profilePic.addEventListener('touchcancel', endPress);
});

// Fetch and render updates
fetch('updates.json')
  .then(r => r.json())
  .then(data => {
    const list = document.getElementById('updates-list');
    if (!list || !data.updates) return;
    data.updates.forEach(u => {
      const li = document.createElement('li');
      li.innerHTML = `<span class="update-date">${u.date}</span><a class="update-link" href="${u.link}" target="_blank">${u.title}</a>`;
      list.appendChild(li);
    });
  })
  .catch(() => {});

// Fetch and render projects
fetch('projects.json')
  .then(r => r.json())
  .then(projects => {
    const list = document.getElementById('projects-list');
    if (!list) return;
    projects.forEach(p => {
      const li = document.createElement('li');
      li.innerHTML = `<a class="project-name" href="${p.link}" target="_blank">${p.name}</a><div class="project-desc">${p.description}</div>`;
      list.appendChild(li);
    });
  })
  .catch(() => {});
