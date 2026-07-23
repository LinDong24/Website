// Live filter for the publications list
const pubSearch = document.getElementById("pub-search");
const pubEntries = document.querySelectorAll(".pub-entry");
const pubEmpty = document.getElementById("pub-empty");

if (pubSearch) {
  pubSearch.addEventListener("input", () => {
    const query = pubSearch.value.trim().toLowerCase();
    let visibleCount = 0;

    pubEntries.forEach((entry) => {
      const haystack = (entry.dataset.search || entry.textContent || "").toLowerCase();
      const matches = query === "" || haystack.includes(query);
      entry.classList.toggle("hidden", !matches);
      if (matches) visibleCount += 1;
    });

    if (pubEmpty) pubEmpty.classList.toggle("hidden", visibleCount !== 0);
  });
}
