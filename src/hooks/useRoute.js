import { useEffect, useMemo, useState } from "react";

function getPath() {
  return window.location.pathname;
}

export function useRoute() {
  const [path, setPath] = useState(getPath);

  useEffect(() => {
    const handleLocationChange = () => setPath(getPath());

    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("pushstate", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("pushstate", handleLocationChange);
    };
  }, []);

  return useMemo(() => {
    const productMatch = path.match(/^\/product\/(\d+)\/?$/);

    if (productMatch) {
      return {
        name: "product",
        params: { id: Number(productMatch[1]) },
      };
    }

    return { name: "listing", params: {} };
  }, [path]);
}

export function navigateTo(path) {
  window.history.pushState(null, "", path);
  window.dispatchEvent(new Event("pushstate"));
}
