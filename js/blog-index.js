// blog-index.js — render blog post previews from posts.json
async function loadPosts() {
  const res = await fetch('/blog/posts.json');
  return res.json();
}

function renderPost(p) {
  const d = new Date(p.date + 'T12:00:00');
  const dateStr = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const tags = p.tags.map(t => `<span class="post-tag">${t}</span>`).join('');
  return `<a href="/blog/${p.slug}" class="post-preview">
    <div class="post-preview__tags">${tags}</div>
    <h2 class="post-preview__title">${p.title}</h2>
    <p class="post-preview__excerpt">${p.excerpt}</p>
    <div class="post-preview__meta">
      <span class="post-preview__date">${dateStr}</span>
      <span class="post-preview__cta">Read <span class="arrow">&rarr;</span></span>
    </div>
  </a>`;
}

export async function mountBlogIndex() {
  const grid = document.getElementById('posts-grid');
  if (!grid) return;
  try {
    const posts = await loadPosts();
    grid.innerHTML = posts.map(renderPost).join('');
  } catch (_) {
    grid.innerHTML = '<p class="text-fg-subtle">Could not load posts. Please try again later.</p>';
  }
}
