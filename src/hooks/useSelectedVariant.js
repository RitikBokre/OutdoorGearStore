import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

function getInitialSelection(enhancements, searchParams) {
  const colorParam = searchParams.get("color");
  const sizeParam = searchParams.get("size");
  const colorExists = enhancements.colors.some((color) => color.id === colorParam);
  const sizeExists = enhancements.sizes.includes(sizeParam);

  return {
    colorId: colorExists ? colorParam : enhancements.colors[0].id,
    size: sizeExists ? sizeParam : enhancements.sizes[1],
  };
}

export function useSelectedVariant(enhancements) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selection, setSelection] = useState(() =>
    getInitialSelection(enhancements, searchParams),
  );
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
    setSearchParams(
      (currentParams) => {
        const params = new URLSearchParams(currentParams);
        params.set("color", selection.colorId);
        params.set("size", selection.size);
        return params;
      },
      { replace: true },
    );
  }, [selection.colorId, selection.size, setSearchParams]);

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
