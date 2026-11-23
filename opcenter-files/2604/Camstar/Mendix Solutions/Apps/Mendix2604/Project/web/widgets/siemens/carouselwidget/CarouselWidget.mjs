
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35730/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
import { useState, useRef, useEffect, createElement } from 'react';

function getDefaultExportFromNamespaceIfNotNamed (n) {
	return n && Object.prototype.hasOwnProperty.call(n, 'default') && Object.keys(n).length === 1 ? n['default'] : n;
}

var type3D48 = "widgets/siemens/carouselwidget/assets/864acfd7319bed15.svg";

var type3D48$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	default: type3D48
});

var require$$0 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(type3D48$1);

var typePdf48 = "widgets/siemens/carouselwidget/assets/e2214b2274837bc4.svg";

var typePdf48$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	default: typePdf48
});

var require$$1 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(typePdf48$1);

var typeMsWord48 = "widgets/siemens/carouselwidget/assets/1404ade2f207b94f.svg";

var typeMsWord48$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	default: typeMsWord48
});

var require$$2 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(typeMsWord48$1);

var typeMsExcel48 = "widgets/siemens/carouselwidget/assets/a5b4b9de76c07c21.svg";

var typeMsExcel48$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	default: typeMsExcel48
});

var require$$3 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(typeMsExcel48$1);

var typeMsPowerpoint48 = "widgets/siemens/carouselwidget/assets/5ab16026ea7f7047.svg";

var typeMsPowerpoint48$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	default: typeMsPowerpoint48
});

var require$$4 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(typeMsPowerpoint48$1);

var typeTxt48 = "widgets/siemens/carouselwidget/assets/99de5d025947bd85.svg";

var typeTxt48$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	default: typeTxt48
});

var require$$5 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(typeTxt48$1);

var typeRTF48 = "widgets/siemens/carouselwidget/assets/a9d704e4d7ca6136.svg";

var typeRTF48$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	default: typeRTF48
});

var require$$6 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(typeRTF48$1);

var typeHtml48 = "widgets/siemens/carouselwidget/assets/2a3506b4e0dac9f9.svg";

var typeHtml48$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	default: typeHtml48
});

var require$$7 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(typeHtml48$1);

var typeJpg48 = "widgets/siemens/carouselwidget/assets/298fc500e4c0494a.svg";

var typeJpg48$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	default: typeJpg48
});

var require$$8 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(typeJpg48$1);

var typePng48 = "widgets/siemens/carouselwidget/assets/dc120fab2ec86557.svg";

var typePng48$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	default: typePng48
});

var require$$9 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(typePng48$1);

var typeBMP48 = "widgets/siemens/carouselwidget/assets/1f8b5356520a07fe.svg";

var typeBMP48$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	default: typeBMP48
});

var require$$10 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(typeBMP48$1);

var typeUnknown48 = "widgets/siemens/carouselwidget/assets/b13f027bf22687d2.svg";

var typeUnknown48$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	default: typeUnknown48
});

var require$$11 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(typeUnknown48$1);

var miscChevronLeft24 = "widgets/siemens/carouselwidget/assets/8033801209f6e21f.svg";

var miscChevronLeft24$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	default: miscChevronLeft24
});

var require$$12 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(miscChevronLeft24$1);

var miscChevronRight24 = "widgets/siemens/carouselwidget/assets/026ba010cc89147e.svg";

var miscChevronRight24$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	default: miscChevronRight24
});

var require$$13 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(miscChevronRight24$1);

const Carousel = ({ documentList, displayName, documentIcon, instanceId, selectedDocumentId, thumbnailClickAction }) => {
    // Static icon mapping for all available icons
    const ICON_MAP = {
        "type3d48.svg": require$$0,
        "typepdf48.svg": require$$1,
        "typemsword48.svg": require$$2,
        "typemsexcel48.svg": require$$3,
        "typemspowerpoint48.svg": require$$4,
        "typetxt48.svg": require$$5,
        "typertf48.svg": require$$6,
        "typehtml48.svg": require$$7,
        "typejpg48.svg": require$$8,
        "typepng48.svg": require$$9,
        "typebmp48.svg": require$$10,
        "typeunknown48.svg": require$$11,
    };
    /**
     * Returns the appropriate icon path based on the item type
     * @param iconPath - The document icon path from Mendix
     * @returns The icon file path
     */
    const getDocumentIcon = (iconPath) => {
        // Extract the icon filename from the Mendix path and convert to lowercase
        const filename = iconPath?.replace("/img/DISW_DesignSystem$SVG_Icons$", "").toLowerCase() || "";
        // Look up the icon in the static map
        return ICON_MAP[filename] || ICON_MAP["typeunknown48.svg"];
    };
    // Use documentList items or empty array if not available
    const items = documentList?.items
        ? documentList.items.map((item, index) => {
            const displayNameValue = displayName?.get(item)?.value || `Item ${index + 1}`;
            const documentIconValue = documentIcon?.get(item)?.value || "UNKNOWN";
            // Determine type from the item or default to UNKNOWN
            const type = "UNKNOWN"; // You can add logic to determine type from item properties
            return {
                type,
                title: displayNameValue,
                icon: getDocumentIcon(documentIconValue),
            };
        })
        : [];
    // Carousel dimensions and spacing constants
    const thumbnailWidth = 80; // Width of each thumbnail in pixels
    const gap = 8; // Gap between thumbnails in pixels
    const arrowWidth = 40; // Width of navigation arrow buttons
    // Current scroll position in the carousel (index of first visible item)
    const [currentIndex, setCurrentIndex] = useState(0);
    // Number of items that can fit in the visible area
    const [visibleCount, setVisibleCount] = useState(3);
    // Index of the currently selected/active item
    const [activeIndex, setActiveIndex] = useState(-1);
    // Whether thumbnails should be centered when they don't fill the track
    const [isCentered, setIsCentered] = useState(false);
    // Reference to the carousel container element for measuring dimensions
    const containerRef = useRef(null);
    // Effect to calculate and update the number of visible items based on container width
    useEffect(() => {
        /**
         * Calculates how many items can fit in the visible carousel area
         * Measures actual DOM elements to account for CSS-applied dimensions
         */
        const updateVisibleCount = () => {
            // Exit early if container hasn't been rendered yet
            if (!containerRef.current)
                return;
            // Get references to carousel elements for measurement
            const trackElement = containerRef.current.querySelector(".carousel-track");
            const firstItem = trackElement?.querySelector(".carousel-item");
            const containerWidth = containerRef.current.getBoundingClientRect().width;
            // Calculate space available for thumbnails (total width minus arrow buttons and margins)
            const reservedForArrows = 2 * (arrowWidth + 20); // 20px margin on each side
            const availableForTrack = Math.max(0, containerWidth - reservedForArrows);
            // Use default dimensions initially
            let actualThumbnailWidth = thumbnailWidth;
            let actualGap = gap;
            // If items are rendered, measure their actual dimensions from the DOM
            if (firstItem && trackElement) {
                const firstItemRect = firstItem.getBoundingClientRect();
                // Only use measured width if valid (greater than 0)
                if (firstItemRect.width > 0)
                    actualThumbnailWidth = firstItemRect.width;
                // Get the actual gap value from CSS
                const trackStyles = window.getComputedStyle(trackElement);
                const gapValue = trackStyles.getPropertyValue("gap") || "8px";
                const parsedGap = parseFloat(gapValue);
                if (!Number.isNaN(parsedGap))
                    actualGap = parsedGap;
            }
            // Calculate how many complete items fit in the available space
            const count = Math.floor((availableForTrack + actualGap) / (actualThumbnailWidth + actualGap));
            const finalCount = count > 0 ? count : 1; // Ensure at least 1 item is visible
            // Update visible count and adjust scroll position if needed
            setVisibleCount((prevCount) => {
                if (prevCount !== finalCount) {
                    // Adjust currentIndex if it exceeds the new max index
                    const newMaxIndex = Math.max(0, items.length - finalCount);
                    setCurrentIndex((prevIndex) => Math.min(prevIndex, newMaxIndex));
                    return finalCount;
                }
                return prevCount;
            });
            // Determine if items should be centered (when they don't fill the entire track width)
            const visibleItems = Math.min(items.length, finalCount);
            const totalVisibleWidth = visibleItems * (actualThumbnailWidth + actualGap) - actualGap;
            setIsCentered(totalVisibleWidth <= availableForTrack);
        };
        // Initial calculation on mount
        updateVisibleCount();
        // Watch for container size changes using ResizeObserver
        let resizeObserver = null;
        if (containerRef.current) {
            resizeObserver = new ResizeObserver(updateVisibleCount);
            resizeObserver.observe(containerRef.current);
        }
        // Also listen for window resize events as a fallback
        window.addEventListener("resize", updateVisibleCount);
        // Cleanup listeners on unmount
        return () => {
            window.removeEventListener("resize", updateVisibleCount);
            resizeObserver?.disconnect();
        };
    }, [items.length]);
    useEffect(() => {
        // Set active index based on selectedDocumentId by matching instanceId
        const documentId = selectedDocumentId?.value?.toString();
        if (!documentId || !documentList?.items) {
            setActiveIndex(-1);
            return;
        }
        // Find the index of the document with matching instanceId
        const matchingIndex = documentList.items.findIndex((item) => {
            const itemInstanceId = instanceId?.get(item)?.value;
            return itemInstanceId && itemInstanceId === documentId;
        });
        if (matchingIndex !== -1) {
            setActiveIndex(matchingIndex);
            // Scroll to make the selected document visible if it's not in the current view
            const isInView = matchingIndex >= currentIndex && matchingIndex < currentIndex + visibleCount;
            if (!isInView) {
                // Calculate the best scroll position to center the selected item
                const newIndex = Math.max(0, Math.min(matchingIndex - Math.floor(visibleCount / 2), items.length - visibleCount));
                setCurrentIndex(newIndex);
            }
        }
        else {
            setActiveIndex(-1);
        }
    }, [selectedDocumentId, documentList, visibleCount, thumbnailClickAction]);
    /**
     * Handles thumbnail click events
     * Sets the clicked item as active and logs the interaction
     */
    const handleThumbnailClick = (globalIndex, item) => {
        // Prevent action execution if clicking on the already active item
        const isAlreadyActive = globalIndex === activeIndex;
        if (isAlreadyActive) {
            console.log("Item already active, ignoring click:", {
                index: globalIndex,
                identifier: item.title,
            });
            return;
        }
        setActiveIndex(globalIndex);
        console.log("Thumbnail clicked:", {
            index: globalIndex,
            identifier: item.title,
            item,
        });
        if (!thumbnailClickAction) {
            console.warn("Thumbnail Click Action is not defined.");
            return;
        }
        const thumbnailAction = thumbnailClickAction.get?.(documentList.items[globalIndex]);
        if (thumbnailAction?.canExecute) {
            thumbnailAction.execute();
        }
        else {
            console.warn("Thumbnail action cannot be executed or is not available.");
        }
    };
    // Calculate the maximum scroll position (last page of items)
    const maxIndex = Math.max(0, items.length - visibleCount);
    // Determine if navigation buttons should be enabled
    const canGoNext = currentIndex < maxIndex;
    const canGoPrev = currentIndex > 0;
    /**
     * Navigates to the next slide (scrolls right by one item)
     */
    const nextSlide = () => {
        if (canGoNext) {
            setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
        }
    };
    /**
     * Navigates to the previous slide (scrolls left by one item)
     */
    const prevSlide = () => {
        if (canGoPrev) {
            setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        }
    };
    /**
     * Returns the subset of items that should be visible based on current scroll position
     */
    const getVisibleItems = () => {
        // Show all items if they fit within the visible area
        if (items.length <= visibleCount)
            return items;
        // If scrolled past the end, show the last page of items
        if (currentIndex > items.length - visibleCount) {
            return items.slice(items.length - visibleCount);
        }
        // Normal case: show items starting from currentIndex
        return items.slice(currentIndex, currentIndex + visibleCount);
    };
    return (createElement("div", null,
        createElement("div", { className: "carousel-container", ref: containerRef },
            createElement("div", { className: "carousel-inner" },
                createElement("button", { className: "arrow left", onClick: prevSlide, disabled: !canGoPrev },
                    createElement("img", { src: require$$12, alt: "Previous" })),
                createElement("div", { className: `carousel-track${isCentered ? " center" : ""}` }, getVisibleItems().map((item, index) => {
                    // Calculate the global index (position in full items array) from local index
                    const globalIndex = items.length <= visibleCount
                        ? index // All items visible: local index equals global index
                        : currentIndex > items.length - visibleCount
                            ? items.length - visibleCount + index // At end: offset from last page
                            : currentIndex + index; // Normal: offset by current scroll position
                    // Check if this item matches the selected document
                    const itemInstanceId = documentList.items[globalIndex] ? instanceId?.get(documentList.items[globalIndex])?.value : null;
                    const selectedId = selectedDocumentId?.value?.toString();
                    const isSelected = itemInstanceId && selectedId && itemInstanceId === selectedId;
                    return (createElement("div", { key: globalIndex, className: `carousel-item${globalIndex === activeIndex ? " active" : ""}${isSelected ? " selected" : ""}`, onClick: () => handleThumbnailClick(globalIndex, item), "data-id": globalIndex },
                        createElement("img", { src: item.icon, alt: item.title, className: "item-icon" }),
                        createElement("p", { className: "item-title", title: item.title }, item.title)));
                })),
                createElement("button", { className: "arrow right", onClick: nextSlide, disabled: !canGoNext },
                    createElement("img", { src: require$$13, alt: "Next" }))))));
};

function CarouselWidget({ documentList, displayName, documentIcon, instanceId, selectedDocumentId, thumbnailClickAction }) {
    return (createElement("div", { className: "widget-carousel" },
        createElement(Carousel, { documentList: documentList, displayName: displayName, documentIcon: documentIcon, instanceId: instanceId, selectedDocumentId: selectedDocumentId, thumbnailClickAction: thumbnailClickAction })));
}

export { CarouselWidget };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2Fyb3VzZWxXaWRnZXQubWpzIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvaWNvbnMvdHlwZTNENDguc3ZnIiwiLi4vLi4vLi4vLi4vLi4vc3JjL2ljb25zL3R5cGVQZGY0OC5zdmciLCIuLi8uLi8uLi8uLi8uLi9zcmMvaWNvbnMvdHlwZU1zV29yZDQ4LnN2ZyIsIi4uLy4uLy4uLy4uLy4uL3NyYy9pY29ucy90eXBlTXNFeGNlbDQ4LnN2ZyIsIi4uLy4uLy4uLy4uLy4uL3NyYy9pY29ucy90eXBlTXNQb3dlcnBvaW50NDguc3ZnIiwiLi4vLi4vLi4vLi4vLi4vc3JjL2ljb25zL3R5cGVUeHQ0OC5zdmciLCIuLi8uLi8uLi8uLi8uLi9zcmMvaWNvbnMvdHlwZVJURjQ4LnN2ZyIsIi4uLy4uLy4uLy4uLy4uL3NyYy9pY29ucy90eXBlSHRtbDQ4LnN2ZyIsIi4uLy4uLy4uLy4uLy4uL3NyYy9pY29ucy90eXBlSnBnNDguc3ZnIiwiLi4vLi4vLi4vLi4vLi4vc3JjL2ljb25zL3R5cGVQbmc0OC5zdmciLCIuLi8uLi8uLi8uLi8uLi9zcmMvaWNvbnMvdHlwZUJNUDQ4LnN2ZyIsIi4uLy4uLy4uLy4uLy4uL3NyYy9pY29ucy90eXBlVW5rbm93bjQ4LnN2ZyIsIi4uLy4uLy4uLy4uLy4uL3NyYy9pY29ucy9taXNjQ2hldnJvbkxlZnQyNC5zdmciLCIuLi8uLi8uLi8uLi8uLi9zcmMvaWNvbnMvbWlzY0NoZXZyb25SaWdodDI0LnN2ZyIsIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0Nhcm91c2VsLnRzeCIsIi4uLy4uLy4uLy4uLy4uL3NyYy9DYXJvdXNlbFdpZGdldC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgXCJ3aWRnZXRzL3NpZW1lbnMvY2Fyb3VzZWx3aWRnZXQvYXNzZXRzLzg2NGFjZmQ3MzE5YmVkMTUuc3ZnXCIiLCJleHBvcnQgZGVmYXVsdCBcIndpZGdldHMvc2llbWVucy9jYXJvdXNlbHdpZGdldC9hc3NldHMvZTIyMTRiMjI3NDgzN2JjNC5zdmdcIiIsImV4cG9ydCBkZWZhdWx0IFwid2lkZ2V0cy9zaWVtZW5zL2Nhcm91c2Vsd2lkZ2V0L2Fzc2V0cy8xNDA0YWRlMmYyMDdiOTRmLnN2Z1wiIiwiZXhwb3J0IGRlZmF1bHQgXCJ3aWRnZXRzL3NpZW1lbnMvY2Fyb3VzZWx3aWRnZXQvYXNzZXRzL2E1YjRiOWRlNzZjMDdjMjEuc3ZnXCIiLCJleHBvcnQgZGVmYXVsdCBcIndpZGdldHMvc2llbWVucy9jYXJvdXNlbHdpZGdldC9hc3NldHMvNWFiMTYwMjZlYTdmNzA0Ny5zdmdcIiIsImV4cG9ydCBkZWZhdWx0IFwid2lkZ2V0cy9zaWVtZW5zL2Nhcm91c2Vsd2lkZ2V0L2Fzc2V0cy85OWRlNWQwMjU5NDdiZDg1LnN2Z1wiIiwiZXhwb3J0IGRlZmF1bHQgXCJ3aWRnZXRzL3NpZW1lbnMvY2Fyb3VzZWx3aWRnZXQvYXNzZXRzL2E5ZDcwNGU0ZDdjYTYxMzYuc3ZnXCIiLCJleHBvcnQgZGVmYXVsdCBcIndpZGdldHMvc2llbWVucy9jYXJvdXNlbHdpZGdldC9hc3NldHMvMmEzNTA2YjRlMGRhYzlmOS5zdmdcIiIsImV4cG9ydCBkZWZhdWx0IFwid2lkZ2V0cy9zaWVtZW5zL2Nhcm91c2Vsd2lkZ2V0L2Fzc2V0cy8yOThmYzUwMGU0YzA0OTRhLnN2Z1wiIiwiZXhwb3J0IGRlZmF1bHQgXCJ3aWRnZXRzL3NpZW1lbnMvY2Fyb3VzZWx3aWRnZXQvYXNzZXRzL2RjMTIwZmFiMmVjODY1NTcuc3ZnXCIiLCJleHBvcnQgZGVmYXVsdCBcIndpZGdldHMvc2llbWVucy9jYXJvdXNlbHdpZGdldC9hc3NldHMvMWY4YjUzNTY1MjBhMDdmZS5zdmdcIiIsImV4cG9ydCBkZWZhdWx0IFwid2lkZ2V0cy9zaWVtZW5zL2Nhcm91c2Vsd2lkZ2V0L2Fzc2V0cy9iMTNmMDI3YmYyMjY4N2QyLnN2Z1wiIiwiZXhwb3J0IGRlZmF1bHQgXCJ3aWRnZXRzL3NpZW1lbnMvY2Fyb3VzZWx3aWRnZXQvYXNzZXRzLzgwMzM4MDEyMDlmNmUyMWYuc3ZnXCIiLCJleHBvcnQgZGVmYXVsdCBcIndpZGdldHMvc2llbWVucy9jYXJvdXNlbHdpZGdldC9hc3NldHMvMDI2YmEwMTBjYzg5MTQ3ZS5zdmdcIiIsIi8vIENhcm91c2VsLnRzeFxuaW1wb3J0IFJlYWN0LCB7IGNyZWF0ZUVsZW1lbnQsIHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFwiLi4vdWkvQ2Fyb3VzZWxXaWRnZXQuY3NzXCI7XG5cbmludGVyZmFjZSBDYXJvdXNlbEl0ZW0ge1xuICB0eXBlOlxuICB8IFwiUERGXCJcbiAgfCBcIjNEXCJcbiAgfCBcIldPUkRcIlxuICB8IFwiRVhDRUxcIlxuICB8IFwiUE9XRVJQT0lOVFwiXG4gIHwgXCJUWFRcIlxuICB8IFwiUlRGXCJcbiAgfCBcIkhUTUxcIlxuICB8IFwiSlBHXCJcbiAgfCBcIlBOR1wiXG4gIHwgXCJCTVBcIlxuICB8IFwiVU5LTk9XTlwiO1xuICB0aXRsZTogc3RyaW5nO1xuICBpY29uOiBzdHJpbmc7XG59XG5cbmNvbnN0IENhcm91c2VsOiBSZWFjdC5GQzx7IGRvY3VtZW50TGlzdDogYW55OyBpbnN0YW5jZUlkOiBhbnk7IGRpc3BsYXlOYW1lOiBhbnk7IGRvY3VtZW50SWNvbjogYW55OyBzZWxlY3RlZERvY3VtZW50SWQ6IGFueTsgdGh1bWJuYWlsQ2xpY2tBY3Rpb24/OiBhbnkgfT4gPSAoeyBkb2N1bWVudExpc3QsIGRpc3BsYXlOYW1lLCBkb2N1bWVudEljb24sIGluc3RhbmNlSWQsIHNlbGVjdGVkRG9jdW1lbnRJZCwgdGh1bWJuYWlsQ2xpY2tBY3Rpb24gfSkgPT4ge1xuICAvLyBTdGF0aWMgaWNvbiBtYXBwaW5nIGZvciBhbGwgYXZhaWxhYmxlIGljb25zXG4gIGNvbnN0IElDT05fTUFQOiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0ge1xuICAgIFwidHlwZTNkNDguc3ZnXCI6IHJlcXVpcmUoXCIuLi9pY29ucy90eXBlM0Q0OC5zdmdcIiksXG4gICAgXCJ0eXBlcGRmNDguc3ZnXCI6IHJlcXVpcmUoXCIuLi9pY29ucy90eXBlUGRmNDguc3ZnXCIpLFxuICAgIFwidHlwZW1zd29yZDQ4LnN2Z1wiOiByZXF1aXJlKFwiLi4vaWNvbnMvdHlwZU1zV29yZDQ4LnN2Z1wiKSxcbiAgICBcInR5cGVtc2V4Y2VsNDguc3ZnXCI6IHJlcXVpcmUoXCIuLi9pY29ucy90eXBlTXNFeGNlbDQ4LnN2Z1wiKSxcbiAgICBcInR5cGVtc3Bvd2VycG9pbnQ0OC5zdmdcIjogcmVxdWlyZShcIi4uL2ljb25zL3R5cGVNc1Bvd2VycG9pbnQ0OC5zdmdcIiksXG4gICAgXCJ0eXBldHh0NDguc3ZnXCI6IHJlcXVpcmUoXCIuLi9pY29ucy90eXBlVHh0NDguc3ZnXCIpLFxuICAgIFwidHlwZXJ0ZjQ4LnN2Z1wiOiByZXF1aXJlKFwiLi4vaWNvbnMvdHlwZVJURjQ4LnN2Z1wiKSxcbiAgICBcInR5cGVodG1sNDguc3ZnXCI6IHJlcXVpcmUoXCIuLi9pY29ucy90eXBlSHRtbDQ4LnN2Z1wiKSxcbiAgICBcInR5cGVqcGc0OC5zdmdcIjogcmVxdWlyZShcIi4uL2ljb25zL3R5cGVKcGc0OC5zdmdcIiksXG4gICAgXCJ0eXBlcG5nNDguc3ZnXCI6IHJlcXVpcmUoXCIuLi9pY29ucy90eXBlUG5nNDguc3ZnXCIpLFxuICAgIFwidHlwZWJtcDQ4LnN2Z1wiOiByZXF1aXJlKFwiLi4vaWNvbnMvdHlwZUJNUDQ4LnN2Z1wiKSxcbiAgICBcInR5cGV1bmtub3duNDguc3ZnXCI6IHJlcXVpcmUoXCIuLi9pY29ucy90eXBlVW5rbm93bjQ4LnN2Z1wiKSxcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgYXBwcm9wcmlhdGUgaWNvbiBwYXRoIGJhc2VkIG9uIHRoZSBpdGVtIHR5cGVcbiAgICogQHBhcmFtIGljb25QYXRoIC0gVGhlIGRvY3VtZW50IGljb24gcGF0aCBmcm9tIE1lbmRpeFxuICAgKiBAcmV0dXJucyBUaGUgaWNvbiBmaWxlIHBhdGhcbiAgICovXG4gIGNvbnN0IGdldERvY3VtZW50SWNvbiA9IChpY29uUGF0aDogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICAvLyBFeHRyYWN0IHRoZSBpY29uIGZpbGVuYW1lIGZyb20gdGhlIE1lbmRpeCBwYXRoIGFuZCBjb252ZXJ0IHRvIGxvd2VyY2FzZVxuICAgIGNvbnN0IGZpbGVuYW1lID0gaWNvblBhdGg/LnJlcGxhY2UoXCIvaW1nL0RJU1dfRGVzaWduU3lzdGVtJFNWR19JY29ucyRcIiwgXCJcIikudG9Mb3dlckNhc2UoKSB8fCBcIlwiO1xuICAgIC8vIExvb2sgdXAgdGhlIGljb24gaW4gdGhlIHN0YXRpYyBtYXBcbiAgICByZXR1cm4gSUNPTl9NQVBbZmlsZW5hbWVdIHx8IElDT05fTUFQW1widHlwZXVua25vd240OC5zdmdcIl07XG4gIH07XG5cbiAgLy8gVXNlIGRvY3VtZW50TGlzdCBpdGVtcyBvciBlbXB0eSBhcnJheSBpZiBub3QgYXZhaWxhYmxlXG4gIGNvbnN0IGl0ZW1zOiBDYXJvdXNlbEl0ZW1bXSA9IGRvY3VtZW50TGlzdD8uaXRlbXNcbiAgICA/IGRvY3VtZW50TGlzdC5pdGVtcy5tYXAoKGl0ZW06IGFueSwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgY29uc3QgZGlzcGxheU5hbWVWYWx1ZSA9IGRpc3BsYXlOYW1lPy5nZXQoaXRlbSk/LnZhbHVlIHx8IGBJdGVtICR7aW5kZXggKyAxfWA7XG4gICAgICBjb25zdCBkb2N1bWVudEljb25WYWx1ZSA9IGRvY3VtZW50SWNvbj8uZ2V0KGl0ZW0pPy52YWx1ZSB8fCBcIlVOS05PV05cIjtcbiAgICAgIC8vIERldGVybWluZSB0eXBlIGZyb20gdGhlIGl0ZW0gb3IgZGVmYXVsdCB0byBVTktOT1dOXG4gICAgICBjb25zdCB0eXBlOiBDYXJvdXNlbEl0ZW1bXCJ0eXBlXCJdID0gXCJVTktOT1dOXCI7IC8vIFlvdSBjYW4gYWRkIGxvZ2ljIHRvIGRldGVybWluZSB0eXBlIGZyb20gaXRlbSBwcm9wZXJ0aWVzXG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlLFxuICAgICAgICB0aXRsZTogZGlzcGxheU5hbWVWYWx1ZSxcbiAgICAgICAgaWNvbjogZ2V0RG9jdW1lbnRJY29uKGRvY3VtZW50SWNvblZhbHVlKSxcbiAgICAgIH07XG4gICAgfSlcbiAgICA6IFtdO1xuXG4gIC8vIENhcm91c2VsIGRpbWVuc2lvbnMgYW5kIHNwYWNpbmcgY29uc3RhbnRzXG4gIGNvbnN0IHRodW1ibmFpbFdpZHRoID0gODA7IC8vIFdpZHRoIG9mIGVhY2ggdGh1bWJuYWlsIGluIHBpeGVsc1xuICBjb25zdCBnYXAgPSA4OyAvLyBHYXAgYmV0d2VlbiB0aHVtYm5haWxzIGluIHBpeGVsc1xuICBjb25zdCBhcnJvd1dpZHRoID0gNDA7IC8vIFdpZHRoIG9mIG5hdmlnYXRpb24gYXJyb3cgYnV0dG9uc1xuXG4gIC8vIEN1cnJlbnQgc2Nyb2xsIHBvc2l0aW9uIGluIHRoZSBjYXJvdXNlbCAoaW5kZXggb2YgZmlyc3QgdmlzaWJsZSBpdGVtKVxuICBjb25zdCBbY3VycmVudEluZGV4LCBzZXRDdXJyZW50SW5kZXhdID0gdXNlU3RhdGU8bnVtYmVyPigwKTtcbiAgLy8gTnVtYmVyIG9mIGl0ZW1zIHRoYXQgY2FuIGZpdCBpbiB0aGUgdmlzaWJsZSBhcmVhXG4gIGNvbnN0IFt2aXNpYmxlQ291bnQsIHNldFZpc2libGVDb3VudF0gPSB1c2VTdGF0ZTxudW1iZXI+KDMpO1xuICAvLyBJbmRleCBvZiB0aGUgY3VycmVudGx5IHNlbGVjdGVkL2FjdGl2ZSBpdGVtXG4gIGNvbnN0IFthY3RpdmVJbmRleCwgc2V0QWN0aXZlSW5kZXhdID0gdXNlU3RhdGU8bnVtYmVyPigtMSk7XG4gIC8vIFdoZXRoZXIgdGh1bWJuYWlscyBzaG91bGQgYmUgY2VudGVyZWQgd2hlbiB0aGV5IGRvbid0IGZpbGwgdGhlIHRyYWNrXG4gIGNvbnN0IFtpc0NlbnRlcmVkLCBzZXRJc0NlbnRlcmVkXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcblxuICAvLyBSZWZlcmVuY2UgdG8gdGhlIGNhcm91c2VsIGNvbnRhaW5lciBlbGVtZW50IGZvciBtZWFzdXJpbmcgZGltZW5zaW9uc1xuICBjb25zdCBjb250YWluZXJSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcblxuICAvLyBFZmZlY3QgdG8gY2FsY3VsYXRlIGFuZCB1cGRhdGUgdGhlIG51bWJlciBvZiB2aXNpYmxlIGl0ZW1zIGJhc2VkIG9uIGNvbnRhaW5lciB3aWR0aFxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZXMgaG93IG1hbnkgaXRlbXMgY2FuIGZpdCBpbiB0aGUgdmlzaWJsZSBjYXJvdXNlbCBhcmVhXG4gICAgICogTWVhc3VyZXMgYWN0dWFsIERPTSBlbGVtZW50cyB0byBhY2NvdW50IGZvciBDU1MtYXBwbGllZCBkaW1lbnNpb25zXG4gICAgICovXG4gICAgY29uc3QgdXBkYXRlVmlzaWJsZUNvdW50ID0gKCkgPT4ge1xuICAgICAgLy8gRXhpdCBlYXJseSBpZiBjb250YWluZXIgaGFzbid0IGJlZW4gcmVuZGVyZWQgeWV0XG4gICAgICBpZiAoIWNvbnRhaW5lclJlZi5jdXJyZW50KSByZXR1cm47XG5cbiAgICAgIC8vIEdldCByZWZlcmVuY2VzIHRvIGNhcm91c2VsIGVsZW1lbnRzIGZvciBtZWFzdXJlbWVudFxuICAgICAgY29uc3QgdHJhY2tFbGVtZW50ID0gY29udGFpbmVyUmVmLmN1cnJlbnQucXVlcnlTZWxlY3RvcjxIVE1MRGl2RWxlbWVudD4oXCIuY2Fyb3VzZWwtdHJhY2tcIik7XG4gICAgICBjb25zdCBmaXJzdEl0ZW0gPSB0cmFja0VsZW1lbnQ/LnF1ZXJ5U2VsZWN0b3I8SFRNTERpdkVsZW1lbnQ+KFwiLmNhcm91c2VsLWl0ZW1cIik7XG4gICAgICBjb25zdCBjb250YWluZXJXaWR0aCA9IGNvbnRhaW5lclJlZi5jdXJyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuXG4gICAgICAvLyBDYWxjdWxhdGUgc3BhY2UgYXZhaWxhYmxlIGZvciB0aHVtYm5haWxzICh0b3RhbCB3aWR0aCBtaW51cyBhcnJvdyBidXR0b25zIGFuZCBtYXJnaW5zKVxuICAgICAgY29uc3QgcmVzZXJ2ZWRGb3JBcnJvd3MgPSAyICogKGFycm93V2lkdGggKyAyMCk7IC8vIDIwcHggbWFyZ2luIG9uIGVhY2ggc2lkZVxuICAgICAgY29uc3QgYXZhaWxhYmxlRm9yVHJhY2sgPSBNYXRoLm1heCgwLCBjb250YWluZXJXaWR0aCAtIHJlc2VydmVkRm9yQXJyb3dzKTtcblxuICAgICAgLy8gVXNlIGRlZmF1bHQgZGltZW5zaW9ucyBpbml0aWFsbHlcbiAgICAgIGxldCBhY3R1YWxUaHVtYm5haWxXaWR0aCA9IHRodW1ibmFpbFdpZHRoO1xuICAgICAgbGV0IGFjdHVhbEdhcCA9IGdhcDtcblxuICAgICAgLy8gSWYgaXRlbXMgYXJlIHJlbmRlcmVkLCBtZWFzdXJlIHRoZWlyIGFjdHVhbCBkaW1lbnNpb25zIGZyb20gdGhlIERPTVxuICAgICAgaWYgKGZpcnN0SXRlbSAmJiB0cmFja0VsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgZmlyc3RJdGVtUmVjdCA9IGZpcnN0SXRlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgLy8gT25seSB1c2UgbWVhc3VyZWQgd2lkdGggaWYgdmFsaWQgKGdyZWF0ZXIgdGhhbiAwKVxuICAgICAgICBpZiAoZmlyc3RJdGVtUmVjdC53aWR0aCA+IDApIGFjdHVhbFRodW1ibmFpbFdpZHRoID0gZmlyc3RJdGVtUmVjdC53aWR0aDtcblxuICAgICAgICAvLyBHZXQgdGhlIGFjdHVhbCBnYXAgdmFsdWUgZnJvbSBDU1NcbiAgICAgICAgY29uc3QgdHJhY2tTdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0cmFja0VsZW1lbnQpO1xuICAgICAgICBjb25zdCBnYXBWYWx1ZSA9IHRyYWNrU3R5bGVzLmdldFByb3BlcnR5VmFsdWUoXCJnYXBcIikgfHwgXCI4cHhcIjtcbiAgICAgICAgY29uc3QgcGFyc2VkR2FwID0gcGFyc2VGbG9hdChnYXBWYWx1ZSk7XG4gICAgICAgIGlmICghTnVtYmVyLmlzTmFOKHBhcnNlZEdhcCkpIGFjdHVhbEdhcCA9IHBhcnNlZEdhcDtcbiAgICAgIH1cblxuICAgICAgLy8gQ2FsY3VsYXRlIGhvdyBtYW55IGNvbXBsZXRlIGl0ZW1zIGZpdCBpbiB0aGUgYXZhaWxhYmxlIHNwYWNlXG4gICAgICBjb25zdCBjb3VudCA9IE1hdGguZmxvb3IoKGF2YWlsYWJsZUZvclRyYWNrICsgYWN0dWFsR2FwKSAvIChhY3R1YWxUaHVtYm5haWxXaWR0aCArIGFjdHVhbEdhcCkpO1xuICAgICAgY29uc3QgZmluYWxDb3VudCA9IGNvdW50ID4gMCA/IGNvdW50IDogMTsgLy8gRW5zdXJlIGF0IGxlYXN0IDEgaXRlbSBpcyB2aXNpYmxlXG5cbiAgICAgIC8vIFVwZGF0ZSB2aXNpYmxlIGNvdW50IGFuZCBhZGp1c3Qgc2Nyb2xsIHBvc2l0aW9uIGlmIG5lZWRlZFxuICAgICAgc2V0VmlzaWJsZUNvdW50KChwcmV2Q291bnQpID0+IHtcbiAgICAgICAgaWYgKHByZXZDb3VudCAhPT0gZmluYWxDb3VudCkge1xuICAgICAgICAgIC8vIEFkanVzdCBjdXJyZW50SW5kZXggaWYgaXQgZXhjZWVkcyB0aGUgbmV3IG1heCBpbmRleFxuICAgICAgICAgIGNvbnN0IG5ld01heEluZGV4ID0gTWF0aC5tYXgoMCwgaXRlbXMubGVuZ3RoIC0gZmluYWxDb3VudCk7XG4gICAgICAgICAgc2V0Q3VycmVudEluZGV4KChwcmV2SW5kZXgpID0+IE1hdGgubWluKHByZXZJbmRleCwgbmV3TWF4SW5kZXgpKTtcbiAgICAgICAgICByZXR1cm4gZmluYWxDb3VudDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHJldkNvdW50O1xuICAgICAgfSk7XG5cbiAgICAgIC8vIERldGVybWluZSBpZiBpdGVtcyBzaG91bGQgYmUgY2VudGVyZWQgKHdoZW4gdGhleSBkb24ndCBmaWxsIHRoZSBlbnRpcmUgdHJhY2sgd2lkdGgpXG4gICAgICBjb25zdCB2aXNpYmxlSXRlbXMgPSBNYXRoLm1pbihpdGVtcy5sZW5ndGgsIGZpbmFsQ291bnQpO1xuICAgICAgY29uc3QgdG90YWxWaXNpYmxlV2lkdGggPSB2aXNpYmxlSXRlbXMgKiAoYWN0dWFsVGh1bWJuYWlsV2lkdGggKyBhY3R1YWxHYXApIC0gYWN0dWFsR2FwO1xuICAgICAgc2V0SXNDZW50ZXJlZCh0b3RhbFZpc2libGVXaWR0aCA8PSBhdmFpbGFibGVGb3JUcmFjayk7XG4gICAgfTtcblxuICAgIC8vIEluaXRpYWwgY2FsY3VsYXRpb24gb24gbW91bnRcbiAgICB1cGRhdGVWaXNpYmxlQ291bnQoKTtcblxuICAgIC8vIFdhdGNoIGZvciBjb250YWluZXIgc2l6ZSBjaGFuZ2VzIHVzaW5nIFJlc2l6ZU9ic2VydmVyXG4gICAgbGV0IHJlc2l6ZU9ic2VydmVyOiBSZXNpemVPYnNlcnZlciB8IG51bGwgPSBudWxsO1xuICAgIGlmIChjb250YWluZXJSZWYuY3VycmVudCkge1xuICAgICAgcmVzaXplT2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIodXBkYXRlVmlzaWJsZUNvdW50KTtcbiAgICAgIHJlc2l6ZU9ic2VydmVyLm9ic2VydmUoY29udGFpbmVyUmVmLmN1cnJlbnQpO1xuICAgIH1cblxuICAgIC8vIEFsc28gbGlzdGVuIGZvciB3aW5kb3cgcmVzaXplIGV2ZW50cyBhcyBhIGZhbGxiYWNrXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdXBkYXRlVmlzaWJsZUNvdW50KTtcblxuICAgIC8vIENsZWFudXAgbGlzdGVuZXJzIG9uIHVubW91bnRcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdXBkYXRlVmlzaWJsZUNvdW50KTtcbiAgICAgIHJlc2l6ZU9ic2VydmVyPy5kaXNjb25uZWN0KCk7XG4gICAgfTtcbiAgfSwgW2l0ZW1zLmxlbmd0aF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgLy8gU2V0IGFjdGl2ZSBpbmRleCBiYXNlZCBvbiBzZWxlY3RlZERvY3VtZW50SWQgYnkgbWF0Y2hpbmcgaW5zdGFuY2VJZFxuICAgIGNvbnN0IGRvY3VtZW50SWQgPSBzZWxlY3RlZERvY3VtZW50SWQ/LnZhbHVlPy50b1N0cmluZygpO1xuXG4gICAgaWYgKCFkb2N1bWVudElkIHx8ICFkb2N1bWVudExpc3Q/Lml0ZW1zKSB7XG4gICAgICBzZXRBY3RpdmVJbmRleCgtMSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gRmluZCB0aGUgaW5kZXggb2YgdGhlIGRvY3VtZW50IHdpdGggbWF0Y2hpbmcgaW5zdGFuY2VJZFxuICAgIGNvbnN0IG1hdGNoaW5nSW5kZXggPSBkb2N1bWVudExpc3QuaXRlbXMuZmluZEluZGV4KChpdGVtOiBhbnkpID0+IHtcbiAgICAgIGNvbnN0IGl0ZW1JbnN0YW5jZUlkID0gaW5zdGFuY2VJZD8uZ2V0KGl0ZW0pPy52YWx1ZTtcbiAgICAgIHJldHVybiBpdGVtSW5zdGFuY2VJZCAmJiBpdGVtSW5zdGFuY2VJZCA9PT0gZG9jdW1lbnRJZDtcbiAgICB9KTtcblxuICAgIGlmIChtYXRjaGluZ0luZGV4ICE9PSAtMSkge1xuICAgICAgc2V0QWN0aXZlSW5kZXgobWF0Y2hpbmdJbmRleCk7XG5cbiAgICAgIC8vIFNjcm9sbCB0byBtYWtlIHRoZSBzZWxlY3RlZCBkb2N1bWVudCB2aXNpYmxlIGlmIGl0J3Mgbm90IGluIHRoZSBjdXJyZW50IHZpZXdcbiAgICAgIGNvbnN0IGlzSW5WaWV3ID0gbWF0Y2hpbmdJbmRleCA+PSBjdXJyZW50SW5kZXggJiYgbWF0Y2hpbmdJbmRleCA8IGN1cnJlbnRJbmRleCArIHZpc2libGVDb3VudDtcbiAgICAgIGlmICghaXNJblZpZXcpIHtcbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBiZXN0IHNjcm9sbCBwb3NpdGlvbiB0byBjZW50ZXIgdGhlIHNlbGVjdGVkIGl0ZW1cbiAgICAgICAgY29uc3QgbmV3SW5kZXggPSBNYXRoLm1heCgwLCBNYXRoLm1pbihtYXRjaGluZ0luZGV4IC0gTWF0aC5mbG9vcih2aXNpYmxlQ291bnQgLyAyKSwgaXRlbXMubGVuZ3RoIC0gdmlzaWJsZUNvdW50KSk7XG4gICAgICAgIHNldEN1cnJlbnRJbmRleChuZXdJbmRleCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldEFjdGl2ZUluZGV4KC0xKTtcbiAgICB9XG4gIH0sIFtzZWxlY3RlZERvY3VtZW50SWQsIGRvY3VtZW50TGlzdCwgdmlzaWJsZUNvdW50LCB0aHVtYm5haWxDbGlja0FjdGlvbl0pO1xuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHRodW1ibmFpbCBjbGljayBldmVudHNcbiAgICogU2V0cyB0aGUgY2xpY2tlZCBpdGVtIGFzIGFjdGl2ZSBhbmQgbG9ncyB0aGUgaW50ZXJhY3Rpb25cbiAgICovXG4gIGNvbnN0IGhhbmRsZVRodW1ibmFpbENsaWNrID0gKGdsb2JhbEluZGV4OiBudW1iZXIsIGl0ZW06IENhcm91c2VsSXRlbSkgPT4ge1xuICAgIC8vIFByZXZlbnQgYWN0aW9uIGV4ZWN1dGlvbiBpZiBjbGlja2luZyBvbiB0aGUgYWxyZWFkeSBhY3RpdmUgaXRlbVxuICAgIGNvbnN0IGlzQWxyZWFkeUFjdGl2ZSA9IGdsb2JhbEluZGV4ID09PSBhY3RpdmVJbmRleDtcblxuICAgIGlmIChpc0FscmVhZHlBY3RpdmUpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiSXRlbSBhbHJlYWR5IGFjdGl2ZSwgaWdub3JpbmcgY2xpY2s6XCIsIHtcbiAgICAgICAgaW5kZXg6IGdsb2JhbEluZGV4LFxuICAgICAgICBpZGVudGlmaWVyOiBpdGVtLnRpdGxlLFxuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2V0QWN0aXZlSW5kZXgoZ2xvYmFsSW5kZXgpO1xuXG4gICAgY29uc29sZS5sb2coXCJUaHVtYm5haWwgY2xpY2tlZDpcIiwge1xuICAgICAgaW5kZXg6IGdsb2JhbEluZGV4LFxuICAgICAgaWRlbnRpZmllcjogaXRlbS50aXRsZSxcbiAgICAgIGl0ZW0sXG4gICAgfSk7XG5cbiAgICBpZiAoIXRodW1ibmFpbENsaWNrQWN0aW9uKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJUaHVtYm5haWwgQ2xpY2sgQWN0aW9uIGlzIG5vdCBkZWZpbmVkLlwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB0aHVtYm5haWxBY3Rpb24gPSB0aHVtYm5haWxDbGlja0FjdGlvbi5nZXQ/Lihkb2N1bWVudExpc3QuaXRlbXNbZ2xvYmFsSW5kZXhdKTtcblxuICAgIGlmICh0aHVtYm5haWxBY3Rpb24/LmNhbkV4ZWN1dGUpIHtcbiAgICAgIHRodW1ibmFpbEFjdGlvbi5leGVjdXRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUud2FybihcIlRodW1ibmFpbCBhY3Rpb24gY2Fubm90IGJlIGV4ZWN1dGVkIG9yIGlzIG5vdCBhdmFpbGFibGUuXCIpO1xuICAgIH1cbiAgfTtcblxuICAvLyBDYWxjdWxhdGUgdGhlIG1heGltdW0gc2Nyb2xsIHBvc2l0aW9uIChsYXN0IHBhZ2Ugb2YgaXRlbXMpXG4gIGNvbnN0IG1heEluZGV4ID0gTWF0aC5tYXgoMCwgaXRlbXMubGVuZ3RoIC0gdmlzaWJsZUNvdW50KTtcbiAgLy8gRGV0ZXJtaW5lIGlmIG5hdmlnYXRpb24gYnV0dG9ucyBzaG91bGQgYmUgZW5hYmxlZFxuICBjb25zdCBjYW5Hb05leHQgPSBjdXJyZW50SW5kZXggPCBtYXhJbmRleDtcbiAgY29uc3QgY2FuR29QcmV2ID0gY3VycmVudEluZGV4ID4gMDtcblxuICAvKipcbiAgICogTmF2aWdhdGVzIHRvIHRoZSBuZXh0IHNsaWRlIChzY3JvbGxzIHJpZ2h0IGJ5IG9uZSBpdGVtKVxuICAgKi9cbiAgY29uc3QgbmV4dFNsaWRlID0gKCkgPT4ge1xuICAgIGlmIChjYW5Hb05leHQpIHtcbiAgICAgIHNldEN1cnJlbnRJbmRleCgocHJldkluZGV4KSA9PiBNYXRoLm1pbihwcmV2SW5kZXggKyAxLCBtYXhJbmRleCkpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogTmF2aWdhdGVzIHRvIHRoZSBwcmV2aW91cyBzbGlkZSAoc2Nyb2xscyBsZWZ0IGJ5IG9uZSBpdGVtKVxuICAgKi9cbiAgY29uc3QgcHJldlNsaWRlID0gKCkgPT4ge1xuICAgIGlmIChjYW5Hb1ByZXYpIHtcbiAgICAgIHNldEN1cnJlbnRJbmRleCgocHJldkluZGV4KSA9PiBNYXRoLm1heChwcmV2SW5kZXggLSAxLCAwKSk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBzdWJzZXQgb2YgaXRlbXMgdGhhdCBzaG91bGQgYmUgdmlzaWJsZSBiYXNlZCBvbiBjdXJyZW50IHNjcm9sbCBwb3NpdGlvblxuICAgKi9cbiAgY29uc3QgZ2V0VmlzaWJsZUl0ZW1zID0gKCk6IENhcm91c2VsSXRlbVtdID0+IHtcbiAgICAvLyBTaG93IGFsbCBpdGVtcyBpZiB0aGV5IGZpdCB3aXRoaW4gdGhlIHZpc2libGUgYXJlYVxuICAgIGlmIChpdGVtcy5sZW5ndGggPD0gdmlzaWJsZUNvdW50KSByZXR1cm4gaXRlbXM7XG4gICAgLy8gSWYgc2Nyb2xsZWQgcGFzdCB0aGUgZW5kLCBzaG93IHRoZSBsYXN0IHBhZ2Ugb2YgaXRlbXNcbiAgICBpZiAoY3VycmVudEluZGV4ID4gaXRlbXMubGVuZ3RoIC0gdmlzaWJsZUNvdW50KSB7XG4gICAgICByZXR1cm4gaXRlbXMuc2xpY2UoaXRlbXMubGVuZ3RoIC0gdmlzaWJsZUNvdW50KTtcbiAgICB9XG4gICAgLy8gTm9ybWFsIGNhc2U6IHNob3cgaXRlbXMgc3RhcnRpbmcgZnJvbSBjdXJyZW50SW5kZXhcbiAgICByZXR1cm4gaXRlbXMuc2xpY2UoY3VycmVudEluZGV4LCBjdXJyZW50SW5kZXggKyB2aXNpYmxlQ291bnQpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2Fyb3VzZWwtY29udGFpbmVyXCIgcmVmPXtjb250YWluZXJSZWZ9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcm91c2VsLWlubmVyXCI+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhcnJvdyBsZWZ0XCIgb25DbGljaz17cHJldlNsaWRlfSBkaXNhYmxlZD17IWNhbkdvUHJldn0+XG4gICAgICAgICAgICA8aW1nIHNyYz17cmVxdWlyZShcIi4uL2ljb25zL21pc2NDaGV2cm9uTGVmdDI0LnN2Z1wiKX0gYWx0PVwiUHJldmlvdXNcIiAvPlxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BjYXJvdXNlbC10cmFjayR7aXNDZW50ZXJlZCA/IFwiIGNlbnRlclwiIDogXCJcIn1gfT5cbiAgICAgICAgICAgIHtnZXRWaXNpYmxlSXRlbXMoKS5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgZ2xvYmFsIGluZGV4IChwb3NpdGlvbiBpbiBmdWxsIGl0ZW1zIGFycmF5KSBmcm9tIGxvY2FsIGluZGV4XG4gICAgICAgICAgICAgIGNvbnN0IGdsb2JhbEluZGV4ID1cbiAgICAgICAgICAgICAgICBpdGVtcy5sZW5ndGggPD0gdmlzaWJsZUNvdW50XG4gICAgICAgICAgICAgICAgICA/IGluZGV4IC8vIEFsbCBpdGVtcyB2aXNpYmxlOiBsb2NhbCBpbmRleCBlcXVhbHMgZ2xvYmFsIGluZGV4XG4gICAgICAgICAgICAgICAgICA6IGN1cnJlbnRJbmRleCA+IGl0ZW1zLmxlbmd0aCAtIHZpc2libGVDb3VudFxuICAgICAgICAgICAgICAgICAgICA/IGl0ZW1zLmxlbmd0aCAtIHZpc2libGVDb3VudCArIGluZGV4IC8vIEF0IGVuZDogb2Zmc2V0IGZyb20gbGFzdCBwYWdlXG4gICAgICAgICAgICAgICAgICAgIDogY3VycmVudEluZGV4ICsgaW5kZXg7IC8vIE5vcm1hbDogb2Zmc2V0IGJ5IGN1cnJlbnQgc2Nyb2xsIHBvc2l0aW9uXG5cbiAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhpcyBpdGVtIG1hdGNoZXMgdGhlIHNlbGVjdGVkIGRvY3VtZW50XG4gICAgICAgICAgICAgIGNvbnN0IGl0ZW1JbnN0YW5jZUlkID0gZG9jdW1lbnRMaXN0Lml0ZW1zW2dsb2JhbEluZGV4XSA/IGluc3RhbmNlSWQ/LmdldChkb2N1bWVudExpc3QuaXRlbXNbZ2xvYmFsSW5kZXhdKT8udmFsdWUgOiBudWxsO1xuICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZElkID0gc2VsZWN0ZWREb2N1bWVudElkPy52YWx1ZT8udG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgY29uc3QgaXNTZWxlY3RlZCA9IGl0ZW1JbnN0YW5jZUlkICYmIHNlbGVjdGVkSWQgJiYgaXRlbUluc3RhbmNlSWQgPT09IHNlbGVjdGVkSWQ7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICBrZXk9e2dsb2JhbEluZGV4fVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgY2Fyb3VzZWwtaXRlbSR7Z2xvYmFsSW5kZXggPT09IGFjdGl2ZUluZGV4ID8gXCIgYWN0aXZlXCIgOiBcIlwifSR7aXNTZWxlY3RlZCA/IFwiIHNlbGVjdGVkXCIgOiBcIlwifWB9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVUaHVtYm5haWxDbGljayhnbG9iYWxJbmRleCwgaXRlbSl9XG4gICAgICAgICAgICAgICAgICBkYXRhLWlkPXtnbG9iYWxJbmRleH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8aW1nIHNyYz17aXRlbS5pY29ufSBhbHQ9e2l0ZW0udGl0bGV9IGNsYXNzTmFtZT1cIml0ZW0taWNvblwiIC8+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJpdGVtLXRpdGxlXCIgdGl0bGU9e2l0ZW0udGl0bGV9PntpdGVtLnRpdGxlfTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhcnJvdyByaWdodFwiIG9uQ2xpY2s9e25leHRTbGlkZX0gZGlzYWJsZWQ9eyFjYW5Hb05leHR9PlxuICAgICAgICAgICAgPGltZyBzcmM9e3JlcXVpcmUoXCIuLi9pY29ucy9taXNjQ2hldnJvblJpZ2h0MjQuc3ZnXCIpfSBhbHQ9XCJOZXh0XCIgLz5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENhcm91c2VsO1xuIiwiaW1wb3J0IHsgUmVhY3RFbGVtZW50LCBjcmVhdGVFbGVtZW50IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBDYXJvdXNlbFdpZGdldENvbnRhaW5lclByb3BzIH0gZnJvbSBcIi4uL3R5cGluZ3MvQ2Fyb3VzZWxXaWRnZXRQcm9wc1wiO1xuXG5pbXBvcnQgXCIuL3VpL0Nhcm91c2VsV2lkZ2V0LmNzc1wiO1xuaW1wb3J0IENhcm91c2VsIGZyb20gXCIuL2NvbXBvbmVudHMvQ2Fyb3VzZWxcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIENhcm91c2VsV2lkZ2V0KHtkb2N1bWVudExpc3QsIGRpc3BsYXlOYW1lLGRvY3VtZW50SWNvbixpbnN0YW5jZUlkLHNlbGVjdGVkRG9jdW1lbnRJZCwgdGh1bWJuYWlsQ2xpY2tBY3Rpb24gfTogQ2Fyb3VzZWxXaWRnZXRDb250YWluZXJQcm9wcyk6IFJlYWN0RWxlbWVudCB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtY2Fyb3VzZWxcIj5cbiAgICAgIDxDYXJvdXNlbCBkb2N1bWVudExpc3Q9e2RvY3VtZW50TGlzdH0gZGlzcGxheU5hbWU9e2Rpc3BsYXlOYW1lfSBkb2N1bWVudEljb249e2RvY3VtZW50SWNvbn0gaW5zdGFuY2VJZD17aW5zdGFuY2VJZH0gc2VsZWN0ZWREb2N1bWVudElkPXtzZWxlY3RlZERvY3VtZW50SWR9IHRodW1ibmFpbENsaWNrQWN0aW9uPXt0aHVtYm5haWxDbGlja0FjdGlvbn0gLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLGVBQWU7Ozs7Ozs7OztBQ0FmLGdCQUFlOzs7Ozs7Ozs7QUNBZixtQkFBZTs7Ozs7Ozs7O0FDQWYsb0JBQWU7Ozs7Ozs7OztBQ0FmLHlCQUFlOzs7Ozs7Ozs7QUNBZixnQkFBZTs7Ozs7Ozs7O0FDQWYsZ0JBQWU7Ozs7Ozs7OztBQ0FmLGlCQUFlOzs7Ozs7Ozs7QUNBZixnQkFBZTs7Ozs7Ozs7O0FDQWYsZ0JBQWU7Ozs7Ozs7OztBQ0FmLGdCQUFlOzs7Ozs7Ozs7QUNBZixvQkFBZTs7Ozs7Ozs7O0FDQWYsd0JBQWU7Ozs7Ozs7OztBQ0FmLHlCQUFlOzs7Ozs7Ozs7QUNzQmYsTUFBTSxRQUFRLEdBQStJLENBQUMsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsa0JBQWtCLEVBQUUsb0JBQW9CLEVBQUUsS0FBSTs7QUFFalEsSUFBQSxNQUFNLFFBQVEsR0FBd0I7QUFDcEMsUUFBQSxjQUFjLEVBQUUsVUFBZ0M7QUFDaEQsUUFBQSxlQUFlLEVBQUUsVUFBaUM7QUFDbEQsUUFBQSxrQkFBa0IsRUFBRSxVQUFvQztBQUN4RCxRQUFBLG1CQUFtQixFQUFFLFVBQXFDO0FBQzFELFFBQUEsd0JBQXdCLEVBQUUsVUFBMEM7QUFDcEUsUUFBQSxlQUFlLEVBQUUsVUFBaUM7QUFDbEQsUUFBQSxlQUFlLEVBQUUsVUFBaUM7QUFDbEQsUUFBQSxnQkFBZ0IsRUFBRSxVQUFrQztBQUNwRCxRQUFBLGVBQWUsRUFBRSxVQUFpQztBQUNsRCxRQUFBLGVBQWUsRUFBRSxVQUFpQztBQUNsRCxRQUFBLGVBQWUsRUFBRSxXQUFpQztBQUNsRCxRQUFBLG1CQUFtQixFQUFFLFdBQXFDO0tBQzNELENBQUE7QUFFRDs7OztB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
