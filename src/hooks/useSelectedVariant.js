import { useEffect, useMemo, useState } from "react";

function getInitialSelection(enhancements) {
  const params = new URLSearchParams(window.location.search);
  const colorParam = params.get("color");
  const sizeParam = params.get("size");
  const colorExists = enhancements.colors.some((color) => color.id === colorParam);
  const sizeExists = enhancements.sizes.includes(sizeParam);

  return {
    colorId: colorExists ? colorParam : enhancements.colors[0].id,
    size: sizeExists ? sizeParam : enhancements.sizes[1],
  };
}

export function useSelectedVariant(enhancements) {
  const [selection, setSelection] = useState(() => getInitialSelection(enhancements));
  const [quantity, setQuantity] = useState(1);

  const selectedColor = useMemo(
    () =>
      enhancements.colors.find((color) => color.id === selection.colorId) ??
      enhancements.colors[0],
    [enhancements.colors, selection.colorId],
  );

  const selectedVariant = useMemo(
    () =>
      enhancements.variants.find(
        (variant) =>
          variant.colorId === selection.colorId && variant.size === selection.size,
      ),
    [enhancements.variants, selection.colorId, selection.size],
  );

  const sizeVariants = useMemo(
    () =>
      enhancements.sizes.map((size) => ({
        size,
        variant: enhancements.variants.find(
          (item) => item.colorId === selection.colorId && item.size === size,
        ),
      })),
    [enhancements.sizes, enhancements.variants, selection.colorId],
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set("color", selection.colorId);
    params.set("size", selection.size);
    window.history.replaceState(null, "", `${window.location.pathname}?${params}`);
  }, [selection]);

  useEffect(() => {
    const max = Math.max(selectedVariant?.stock ?? 1, 1);
    setQuantity((current) => Math.min(current, max));
  }, [selectedVariant]);

  return {
    quantity,
    selectedColor,
    selectedVariant,
    selection,
    setColor: (colorId) => setSelection((current) => ({ ...current, colorId })),
    setQuantity,
    setSize: (size) => setSelection((current) => ({ ...current, size })),
    sizeVariants,
  };
}
