(function () {
  const STORAGE_KEYS = {
    publishedGames: 'treeforge.publishedGames',
    servers: 'treeforge.servers',
    project: 'treeforge.savedProject',
    authUsers: 'treeforge.authUsers',
    currentUser: 'treeforge.currentUser',
    counters: 'treeforge.counters'
  };

  function getStored(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function setStored(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function getPublishedGames() {
    return getStored(STORAGE_KEYS.publishedGames, []);
  }

  function addPublishedGame(game) {
    const list = getPublishedGames();
    list.unshift(game);
    const trimmed = list.slice(0, 12);
    setStored(STORAGE_KEYS.publishedGames, trimmed);
    return trimmed[0];
  }

  function getServers() {
    return getStored(STORAGE_KEYS.servers, []);
  }

  function addServer(server) {
    const list = getServers();
    list.unshift(server);
    const trimmed = list.slice(0, 10);
    setStored(STORAGE_KEYS.servers, trimmed);
    return trimmed[0];
  }

  function getSavedProject() {
    return getStored(STORAGE_KEYS.project, { name: 'My Game', code: '', parts: [] });
  }

  function saveProject(project) {
    setStored(STORAGE_KEYS.project, project);
  }

  function getAuthUsers() {
    return getStored(STORAGE_KEYS.authUsers, []);
  }

  function createAuthUser(user) {
    const users = getAuthUsers();
    const exists = users.some((entry) => entry.username.toLowerCase() === user.username.toLowerCase());
    if (exists) return null;
    users.push(user);
    setStored(STORAGE_KEYS.authUsers, users);
    return user;
  }

  function signInUser(username, password) {
    const users = getAuthUsers();
    const found = users.find((entry) => entry.username.toLowerCase() === username.toLowerCase() && entry.password === password);
    if (!found) return null;
    const user = { username: found.username, displayName: found.displayName || found.username };
    setStored(STORAGE_KEYS.currentUser, user);
    return user;
  }

  function getCurrentUser() {
    return getStored(STORAGE_KEYS.currentUser, null);
  }

  function clearCurrentUser() {
    setStored(STORAGE_KEYS.currentUser, null);
  }

  function getCounters() {
    return getStored(STORAGE_KEYS.counters, { globalTrees: 14582, myTrees: 19998 });
  }

  function saveCounters(counters) {
    setStored(STORAGE_KEYS.counters, counters);
  }

  window.TreeforgeApp = {
    STORAGE_KEYS,
    getStored,
    setStored,
    getPublishedGames,
    addPublishedGame,
    getServers,
    addServer,
    getSavedProject,
    saveProject,
    getAuthUsers,
    createAuthUser,
    signInUser,
    getCurrentUser,
    clearCurrentUser,
    getCounters,
    saveCounters
  };
})();
