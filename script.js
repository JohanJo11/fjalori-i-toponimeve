document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      document.querySelector('.navbar-menu').classList.toggle('active');
    });
  }

  // Dictionary functionality
  if (document.getElementById('main-content')) {
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        renderToponyms(data.toponyms);
        addAlphabetNavigation();
      });
  }

  // Forum functionality
  if (document.getElementById('forumForm')) {
    const form = document.getElementById('forumForm');
    const postsContainer = document.getElementById('forumPosts');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const post = {
        title: document.getElementById('postTitle').value,
        content: document.getElementById('postContent').value,
        date: new Date().toLocaleString()
      };
      addPostToDOM(post);
      form.reset();
    });

    function addPostToDOM(post) {
      const postElement = document.createElement('div');
      postElement.className = 'post';
      postElement.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        <small>Postuar më: ${post.date}</small>
      `;
      postsContainer.prepend(postElement);
    }
  }
});

// Alphabet functions
function renderToponyms(toponymsData) {
  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = '<h1 class="page-title">Fjalori i Toponimeve</h1>';

  getAlbanianAlphabet().forEach(letter => {
    const section = document.createElement('section');
    section.className = 'letter-section';
    section.id = letter;
    
    const entries = toponymsData[letter] || [];
    let html = `
      <h2 class="letter-heading">${letter}</h2>
      <div class="entries-container">
    `;

    if (entries.length === 0) {
      html += `
        <div class="empty-state">
          <p>Nuk ka të dhëna ende për këtë shkronjë.</p>
          <div class="forum-cta">
            <a href="forum.html">Postoni në Forum</a>
          </div>
        </div>
      `;
    } else {
      entries.forEach(entry => {
        html += `
          <div class="toponym-entry">
            <h3>${entry.name} <span class="type-badge">${entry.type}</span></h3>
            <p>${entry.description}</p>
            <div class="metadata">
              <span class="location">📍 ${entry.location}</span>
            </div>
          </div>
        `;
      });
    }

    html += '</div>';
    section.innerHTML = html;
    mainContent.appendChild(section);
  });
}

function addAlphabetNavigation() {
  const nav = document.createElement('div');
  nav.className = 'alphabet-nav';
  
  getAlbanianAlphabet().forEach(letter => {
    nav.innerHTML += `<a href="#${letter}" class="alphabet-link">${letter}</a>`;
  });

  document.getElementById('main-content').prepend(nav);
}

function getAlbanianAlphabet() {
  return [
    'A', 'B', 'C', 'Ç', 'D', 'DH', 'E', 'Ë', 'F', 'G', 'GJ', 'H',
    'I', 'J', 'K', 'L', 'LL', 'M', 'N', 'NJ', 'O', 'P', 'Q', 'R',
    'RR', 'S', 'SH', 'T', 'TH', 'U', 'V', 'X', 'XH', 'Y', 'Z', 'ZH'
  ];
}