import { navigateTo } from "../../hooks/useRoute.js";

export function NavLink({ children, className, to, ...props }) {
  return (
    <a
      className={className}
      href={to}
      onClick={(event) => {
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.altKey ||
          event.ctrlKey ||
          event.shiftKey
        ) {
          return;
        }

        event.preventDefault();
        navigateTo(to);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      {...props}
    >
      {children}
    </a>
  );
}
