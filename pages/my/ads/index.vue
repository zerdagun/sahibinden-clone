<template>
  <div class="my-ads-page">
    <div class="sidebar-layout">
        <aside class="left-sidebar">
            <div class="sidebar-menu">
                <div class="menu-group">
                    <div class="menu-title">Özet</div>
                </div>
                <div class="menu-group expanded">
                    <div class="menu-title active-parent">İlanlar</div>
                    <ul class="submenu">
                        <li class="active">Yayında Olanlar (0)</li>
                        <li>Yayında Olmayanlar (1)</li>
                    </ul>
                </div>
                 <div class="menu-group">
                    <div class="menu-title">Oto Ekspertiz</div>
                </div>
            </div>
        </aside>

        <main class="main-content">
            <div class="content-header">
                <h2>Yayında Olan İlanlar</h2>
            </div>

            <div class="filter-bar">
                <div class="search-input-wrapper">
                    <input type="text" placeholder="İlan no veya kelime ile" class="filter-search">
                    <button class="filter-btn">Ara</button>
                </div>
            </div>

            <div class="ads-list-container">
                <div class="empty-state-message">
                    Hiç ilan bulunamadı.
                </div>
                <div class="sort-dropdown">
                    Bildirime göre ▼
                </div>
            </div>
        </main>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'profile',
  middleware: 'auth'
});
</script>

<style scoped>
.sidebar-layout {
    display: flex;
    gap: 20px;
}

.left-sidebar {
    width: 240px;
    background: #fff;
    border: 1px solid #eee;
    padding: 10px 0;
}

.menu-title {
    padding: 10px 15px;
    font-size: 14px;
    color: #333;
    cursor: pointer;
}
.menu-title.active-parent {
    font-weight: bold;
    color: #2ea6f8;
    background: #f0f8ff;
}

.submenu {
    list-style: none;
    padding: 0;
    margin: 0;
}
.submenu li {
    padding: 8px 15px 8px 30px;
    font-size: 13px;
    color: #666;
    cursor: pointer;
}
.submenu li:hover { color: #2ea6f8; }
.submenu li.active {
    color: #2ea6f8;
    font-weight: bold;
}

.main-content {
    flex: 1;
    background: #fff;
    border: 1px solid #eee;
    min-height: 400px;
    padding: 20px;
}

.content-header h2 {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
}

.filter-bar {
    display: flex;
    margin-bottom: 20px;
}

.search-input-wrapper {
    display: flex;
    flex: 1;
}

.filter-search {
    flex: 1;
    padding: 8px 10px;
    border: 1px solid #ddd;
    border-right: none;
    border-radius: 3px 0 0 3px;
    outline: none;
    background-color: #fff; 
    color: #333;
}

.filter-btn {
    padding: 8px 20px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 0 3px 3px 0;
    color: #2ea6f8;
    cursor: pointer;
}

.ads-list-container {
    border-top: 1px solid #eee;
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
}

.empty-state-message {
    color: #666;
    font-size: 14px;
}

.sort-dropdown {
    font-size: 12px;
    color: #666;
    border: 1px solid #ddd;
    padding: 5px 10px;
    border-radius: 3px;
    cursor: pointer;
}
</style>
