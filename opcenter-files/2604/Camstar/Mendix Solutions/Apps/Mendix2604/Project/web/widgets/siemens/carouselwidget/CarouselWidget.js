
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
define(['exports', 'react'], (function (exports, react) { 'use strict';

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
	    const [currentIndex, setCurrentIndex] = react.useState(0);
	    // Number of items that can fit in the visible area
	    const [visibleCount, setVisibleCount] = react.useState(3);
	    // Index of the currently selected/active item
	    const [activeIndex, setActiveIndex] = react.useState(-1);
	    // Whether thumbnails should be centered when they don't fill the track
	    const [isCentered, setIsCentered] = react.useState(false);
	    // Reference to the carousel container element for measuring dimensions
	    const containerRef = react.useRef(null);
	    // Effect to calculate and update the number of visible items based on container width
	    react.useEffect(() => {
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
	    react.useEffect(() => {
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
	    return (react.createElement("div", null,
	        react.createElement("div", { className: "carousel-container", ref: containerRef },
	            react.createElement("div", { className: "carousel-inner" },
	                react.createElement("button", { className: "arrow left", onClick: prevSlide, disabled: !canGoPrev },
	                    react.createElement("img", { src: require$$12, alt: "Previous" })),
	                react.createElement("div", { className: `carousel-track${isCentered ? " center" : ""}` }, getVisibleItems().map((item, index) => {
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
	                    return (react.createElement("div", { key: globalIndex, className: `carousel-item${globalIndex === activeIndex ? " active" : ""}${isSelected ? " selected" : ""}`, onClick: () => handleThumbnailClick(globalIndex, item), "data-id": globalIndex },
	                        react.createElement("img", { src: item.icon, alt: item.title, className: "item-icon" }),
	                        react.createElement("p", { className: "item-title", title: item.title }, item.title)));
	                })),
	                react.createElement("button", { className: "arrow right", onClick: nextSlide, disabled: !canGoNext },
	                    react.createElement("img", { src: require$$13, alt: "Next" }))))));
	};

	function CarouselWidget({ documentList, displayName, documentIcon, instanceId, selectedDocumentId, thumbnailClickAction }) {
	    return (react.createElement("div", { className: "widget-carousel" },
	        react.createElement(Carousel, { documentList: documentList, displayName: displayName, documentIcon: documentIcon, instanceId: instanceId, selectedDocumentId: selectedDocumentId, thumbnailClickAction: thumbnailClickAction })));
	}

	exports.CarouselWidget = CarouselWidget;

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2Fyb3VzZWxXaWRnZXQuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9pY29ucy90eXBlM0Q0OC5zdmciLCIuLi8uLi8uLi8uLi8uLi9zcmMvaWNvbnMvdHlwZVBkZjQ4LnN2ZyIsIi4uLy4uLy4uLy4uLy4uL3NyYy9pY29ucy90eXBlTXNXb3JkNDguc3ZnIiwiLi4vLi4vLi4vLi4vLi4vc3JjL2ljb25zL3R5cGVNc0V4Y2VsNDguc3ZnIiwiLi4vLi4vLi4vLi4vLi4vc3JjL2ljb25zL3R5cGVNc1Bvd2VycG9pbnQ0OC5zdmciLCIuLi8uLi8uLi8uLi8uLi9zcmMvaWNvbnMvdHlwZVR4dDQ4LnN2ZyIsIi4uLy4uLy4uLy4uLy4uL3NyYy9pY29ucy90eXBlUlRGNDguc3ZnIiwiLi4vLi4vLi4vLi4vLi4vc3JjL2ljb25zL3R5cGVIdG1sNDguc3ZnIiwiLi4vLi4vLi4vLi4vLi4vc3JjL2ljb25zL3R5cGVKcGc0OC5zdmciLCIuLi8uLi8uLi8uLi8uLi9zcmMvaWNvbnMvdHlwZVBuZzQ4LnN2ZyIsIi4uLy4uLy4uLy4uLy4uL3NyYy9pY29ucy90eXBlQk1QNDguc3ZnIiwiLi4vLi4vLi4vLi4vLi4vc3JjL2ljb25zL3R5cGVVbmtub3duNDguc3ZnIiwiLi4vLi4vLi4vLi4vLi4vc3JjL2ljb25zL21pc2NDaGV2cm9uTGVmdDI0LnN2ZyIsIi4uLy4uLy4uLy4uLy4uL3NyYy9pY29ucy9taXNjQ2hldnJvblJpZ2h0MjQuc3ZnIiwiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvQ2Fyb3VzZWwudHN4IiwiLi4vLi4vLi4vLi4vLi4vc3JjL0Nhcm91c2VsV2lkZ2V0LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBcIndpZGdldHMvc2llbWVucy9jYXJvdXNlbHdpZGdldC9hc3NldHMvODY0YWNmZDczMTliZWQxNS5zdmdcIiIsImV4cG9ydCBkZWZhdWx0IFwid2lkZ2V0cy9zaWVtZW5zL2Nhcm91c2Vsd2lkZ2V0L2Fzc2V0cy9lMjIxNGIyMjc0ODM3YmM0LnN2Z1wiIiwiZXhwb3J0IGRlZmF1bHQgXCJ3aWRnZXRzL3NpZW1lbnMvY2Fyb3VzZWx3aWRnZXQvYXNzZXRzLzE0MDRhZGUyZjIwN2I5NGYuc3ZnXCIiLCJleHBvcnQgZGVmYXVsdCBcIndpZGdldHMvc2llbWVucy9jYXJvdXNlbHdpZGdldC9hc3NldHMvYTViNGI5ZGU3NmMwN2MyMS5zdmdcIiIsImV4cG9ydCBkZWZhdWx0IFwid2lkZ2V0cy9zaWVtZW5zL2Nhcm91c2Vsd2lkZ2V0L2Fzc2V0cy81YWIxNjAyNmVhN2Y3MDQ3LnN2Z1wiIiwiZXhwb3J0IGRlZmF1bHQgXCJ3aWRnZXRzL3NpZW1lbnMvY2Fyb3VzZWx3aWRnZXQvYXNzZXRzLzk5ZGU1ZDAyNTk0N2JkODUuc3ZnXCIiLCJleHBvcnQgZGVmYXVsdCBcIndpZGdldHMvc2llbWVucy9jYXJvdXNlbHdpZGdldC9hc3NldHMvYTlkNzA0ZTRkN2NhNjEzNi5zdmdcIiIsImV4cG9ydCBkZWZhdWx0IFwid2lkZ2V0cy9zaWVtZW5zL2Nhcm91c2Vsd2lkZ2V0L2Fzc2V0cy8yYTM1MDZiNGUwZGFjOWY5LnN2Z1wiIiwiZXhwb3J0IGRlZmF1bHQgXCJ3aWRnZXRzL3NpZW1lbnMvY2Fyb3VzZWx3aWRnZXQvYXNzZXRzLzI5OGZjNTAwZTRjMDQ5NGEuc3ZnXCIiLCJleHBvcnQgZGVmYXVsdCBcIndpZGdldHMvc2llbWVucy9jYXJvdXNlbHdpZGdldC9hc3NldHMvZGMxMjBmYWIyZWM4NjU1Ny5zdmdcIiIsImV4cG9ydCBkZWZhdWx0IFwid2lkZ2V0cy9zaWVtZW5zL2Nhcm91c2Vsd2lkZ2V0L2Fzc2V0cy8xZjhiNTM1NjUyMGEwN2ZlLnN2Z1wiIiwiZXhwb3J0IGRlZmF1bHQgXCJ3aWRnZXRzL3NpZW1lbnMvY2Fyb3VzZWx3aWRnZXQvYXNzZXRzL2IxM2YwMjdiZjIyNjg3ZDIuc3ZnXCIiLCJleHBvcnQgZGVmYXVsdCBcIndpZGdldHMvc2llbWVucy9jYXJvdXNlbHdpZGdldC9hc3NldHMvODAzMzgwMTIwOWY2ZTIxZi5zdmdcIiIsImV4cG9ydCBkZWZhdWx0IFwid2lkZ2V0cy9zaWVtZW5zL2Nhcm91c2Vsd2lkZ2V0L2Fzc2V0cy8wMjZiYTAxMGNjODkxNDdlLnN2Z1wiIiwiLy8gQ2Fyb3VzZWwudHN4XG5pbXBvcnQgUmVhY3QsIHsgY3JlYXRlRWxlbWVudCwgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgXCIuLi91aS9DYXJvdXNlbFdpZGdldC5jc3NcIjtcblxuaW50ZXJmYWNlIENhcm91c2VsSXRlbSB7XG4gIHR5cGU6XG4gIHwgXCJQREZcIlxuICB8IFwiM0RcIlxuICB8IFwiV09SRFwiXG4gIHwgXCJFWENFTFwiXG4gIHwgXCJQT1dFUlBPSU5UXCJcbiAgfCBcIlRYVFwiXG4gIHwgXCJSVEZcIlxuICB8IFwiSFRNTFwiXG4gIHwgXCJKUEdcIlxuICB8IFwiUE5HXCJcbiAgfCBcIkJNUFwiXG4gIHwgXCJVTktOT1dOXCI7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIGljb246IHN0cmluZztcbn1cblxuY29uc3QgQ2Fyb3VzZWw6IFJlYWN0LkZDPHsgZG9jdW1lbnRMaXN0OiBhbnk7IGluc3RhbmNlSWQ6IGFueTsgZGlzcGxheU5hbWU6IGFueTsgZG9jdW1lbnRJY29uOiBhbnk7IHNlbGVjdGVkRG9jdW1lbnRJZDogYW55OyB0aHVtYm5haWxDbGlja0FjdGlvbj86IGFueSB9PiA9ICh7IGRvY3VtZW50TGlzdCwgZGlzcGxheU5hbWUsIGRvY3VtZW50SWNvbiwgaW5zdGFuY2VJZCwgc2VsZWN0ZWREb2N1bWVudElkLCB0aHVtYm5haWxDbGlja0FjdGlvbiB9KSA9PiB7XG4gIC8vIFN0YXRpYyBpY29uIG1hcHBpbmcgZm9yIGFsbCBhdmFpbGFibGUgaWNvbnNcbiAgY29uc3QgSUNPTl9NQVA6IFJlY29yZDxzdHJpbmcsIGFueT4gPSB7XG4gICAgXCJ0eXBlM2Q0OC5zdmdcIjogcmVxdWlyZShcIi4uL2ljb25zL3R5cGUzRDQ4LnN2Z1wiKSxcbiAgICBcInR5cGVwZGY0OC5zdmdcIjogcmVxdWlyZShcIi4uL2ljb25zL3R5cGVQZGY0OC5zdmdcIiksXG4gICAgXCJ0eXBlbXN3b3JkNDguc3ZnXCI6IHJlcXVpcmUoXCIuLi9pY29ucy90eXBlTXNXb3JkNDguc3ZnXCIpLFxuICAgIFwidHlwZW1zZXhjZWw0OC5zdmdcIjogcmVxdWlyZShcIi4uL2ljb25zL3R5cGVNc0V4Y2VsNDguc3ZnXCIpLFxuICAgIFwidHlwZW1zcG93ZXJwb2ludDQ4LnN2Z1wiOiByZXF1aXJlKFwiLi4vaWNvbnMvdHlwZU1zUG93ZXJwb2ludDQ4LnN2Z1wiKSxcbiAgICBcInR5cGV0eHQ0OC5zdmdcIjogcmVxdWlyZShcIi4uL2ljb25zL3R5cGVUeHQ0OC5zdmdcIiksXG4gICAgXCJ0eXBlcnRmNDguc3ZnXCI6IHJlcXVpcmUoXCIuLi9pY29ucy90eXBlUlRGNDguc3ZnXCIpLFxuICAgIFwidHlwZWh0bWw0OC5zdmdcIjogcmVxdWlyZShcIi4uL2ljb25zL3R5cGVIdG1sNDguc3ZnXCIpLFxuICAgIFwidHlwZWpwZzQ4LnN2Z1wiOiByZXF1aXJlKFwiLi4vaWNvbnMvdHlwZUpwZzQ4LnN2Z1wiKSxcbiAgICBcInR5cGVwbmc0OC5zdmdcIjogcmVxdWlyZShcIi4uL2ljb25zL3R5cGVQbmc0OC5zdmdcIiksXG4gICAgXCJ0eXBlYm1wNDguc3ZnXCI6IHJlcXVpcmUoXCIuLi9pY29ucy90eXBlQk1QNDguc3ZnXCIpLFxuICAgIFwidHlwZXVua25vd240OC5zdmdcIjogcmVxdWlyZShcIi4uL2ljb25zL3R5cGVVbmtub3duNDguc3ZnXCIpLFxuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBhcHByb3ByaWF0ZSBpY29uIHBhdGggYmFzZWQgb24gdGhlIGl0ZW0gdHlwZVxuICAgKiBAcGFyYW0gaWNvblBhdGggLSBUaGUgZG9jdW1lbnQgaWNvbiBwYXRoIGZyb20gTWVuZGl4XG4gICAqIEByZXR1cm5zIFRoZSBpY29uIGZpbGUgcGF0aFxuICAgKi9cbiAgY29uc3QgZ2V0RG9jdW1lbnRJY29uID0gKGljb25QYXRoOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIC8vIEV4dHJhY3QgdGhlIGljb24gZmlsZW5hbWUgZnJvbSB0aGUgTWVuZGl4IHBhdGggYW5kIGNvbnZlcnQgdG8gbG93ZXJjYXNlXG4gICAgY29uc3QgZmlsZW5hbWUgPSBpY29uUGF0aD8ucmVwbGFjZShcIi9pbWcvRElTV19EZXNpZ25TeXN0ZW0kU1ZHX0ljb25zJFwiLCBcIlwiKS50b0xvd2VyQ2FzZSgpIHx8IFwiXCI7XG4gICAgLy8gTG9vayB1cCB0aGUgaWNvbiBpbiB0aGUgc3RhdGljIG1hcFxuICAgIHJldHVybiBJQ09OX01BUFtmaWxlbmFtZV0gfHwgSUNPTl9NQVBbXCJ0eXBldW5rbm93bjQ4LnN2Z1wiXTtcbiAgfTtcblxuICAvLyBVc2UgZG9jdW1lbnRMaXN0IGl0ZW1zIG9yIGVtcHR5IGFycmF5IGlmIG5vdCBhdmFpbGFibGVcbiAgY29uc3QgaXRlbXM6IENhcm91c2VsSXRlbVtdID0gZG9jdW1lbnRMaXN0Py5pdGVtc1xuICAgID8gZG9jdW1lbnRMaXN0Lml0ZW1zLm1hcCgoaXRlbTogYW55LCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBkaXNwbGF5TmFtZVZhbHVlID0gZGlzcGxheU5hbWU/LmdldChpdGVtKT8udmFsdWUgfHwgYEl0ZW0gJHtpbmRleCArIDF9YDtcbiAgICAgIGNvbnN0IGRvY3VtZW50SWNvblZhbHVlID0gZG9jdW1lbnRJY29uPy5nZXQoaXRlbSk/LnZhbHVlIHx8IFwiVU5LTk9XTlwiO1xuICAgICAgLy8gRGV0ZXJtaW5lIHR5cGUgZnJvbSB0aGUgaXRlbSBvciBkZWZhdWx0IHRvIFVOS05PV05cbiAgICAgIGNvbnN0IHR5cGU6IENhcm91c2VsSXRlbVtcInR5cGVcIl0gPSBcIlVOS05PV05cIjsgLy8gWW91IGNhbiBhZGQgbG9naWMgdG8gZGV0ZXJtaW5lIHR5cGUgZnJvbSBpdGVtIHByb3BlcnRpZXNcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGUsXG4gICAgICAgIHRpdGxlOiBkaXNwbGF5TmFtZVZhbHVlLFxuICAgICAgICBpY29uOiBnZXREb2N1bWVudEljb24oZG9jdW1lbnRJY29uVmFsdWUpLFxuICAgICAgfTtcbiAgICB9KVxuICAgIDogW107XG5cbiAgLy8gQ2Fyb3VzZWwgZGltZW5zaW9ucyBhbmQgc3BhY2luZyBjb25zdGFudHNcbiAgY29uc3QgdGh1bWJuYWlsV2lkdGggPSA4MDsgLy8gV2lkdGggb2YgZWFjaCB0aHVtYm5haWwgaW4gcGl4ZWxzXG4gIGNvbnN0IGdhcCA9IDg7IC8vIEdhcCBiZXR3ZWVuIHRodW1ibmFpbHMgaW4gcGl4ZWxzXG4gIGNvbnN0IGFycm93V2lkdGggPSA0MDsgLy8gV2lkdGggb2YgbmF2aWdhdGlvbiBhcnJvdyBidXR0b25zXG5cbiAgLy8gQ3VycmVudCBzY3JvbGwgcG9zaXRpb24gaW4gdGhlIGNhcm91c2VsIChpbmRleCBvZiBmaXJzdCB2aXNpYmxlIGl0ZW0pXG4gIGNvbnN0IFtjdXJyZW50SW5kZXgsIHNldEN1cnJlbnRJbmRleF0gPSB1c2VTdGF0ZTxudW1iZXI+KDApO1xuICAvLyBOdW1iZXIgb2YgaXRlbXMgdGhhdCBjYW4gZml0IGluIHRoZSB2aXNpYmxlIGFyZWFcbiAgY29uc3QgW3Zpc2libGVDb3VudCwgc2V0VmlzaWJsZUNvdW50XSA9IHVzZVN0YXRlPG51bWJlcj4oMyk7XG4gIC8vIEluZGV4IG9mIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQvYWN0aXZlIGl0ZW1cbiAgY29uc3QgW2FjdGl2ZUluZGV4LCBzZXRBY3RpdmVJbmRleF0gPSB1c2VTdGF0ZTxudW1iZXI+KC0xKTtcbiAgLy8gV2hldGhlciB0aHVtYm5haWxzIHNob3VsZCBiZSBjZW50ZXJlZCB3aGVuIHRoZXkgZG9uJ3QgZmlsbCB0aGUgdHJhY2tcbiAgY29uc3QgW2lzQ2VudGVyZWQsIHNldElzQ2VudGVyZWRdID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIC8vIFJlZmVyZW5jZSB0byB0aGUgY2Fyb3VzZWwgY29udGFpbmVyIGVsZW1lbnQgZm9yIG1lYXN1cmluZyBkaW1lbnNpb25zXG4gIGNvbnN0IGNvbnRhaW5lclJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuXG4gIC8vIEVmZmVjdCB0byBjYWxjdWxhdGUgYW5kIHVwZGF0ZSB0aGUgbnVtYmVyIG9mIHZpc2libGUgaXRlbXMgYmFzZWQgb24gY29udGFpbmVyIHdpZHRoXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlcyBob3cgbWFueSBpdGVtcyBjYW4gZml0IGluIHRoZSB2aXNpYmxlIGNhcm91c2VsIGFyZWFcbiAgICAgKiBNZWFzdXJlcyBhY3R1YWwgRE9NIGVsZW1lbnRzIHRvIGFjY291bnQgZm9yIENTUy1hcHBsaWVkIGRpbWVuc2lvbnNcbiAgICAgKi9cbiAgICBjb25zdCB1cGRhdGVWaXNpYmxlQ291bnQgPSAoKSA9PiB7XG4gICAgICAvLyBFeGl0IGVhcmx5IGlmIGNvbnRhaW5lciBoYXNuJ3QgYmVlbiByZW5kZXJlZCB5ZXRcbiAgICAgIGlmICghY29udGFpbmVyUmVmLmN1cnJlbnQpIHJldHVybjtcblxuICAgICAgLy8gR2V0IHJlZmVyZW5jZXMgdG8gY2Fyb3VzZWwgZWxlbWVudHMgZm9yIG1lYXN1cmVtZW50XG4gICAgICBjb25zdCB0cmFja0VsZW1lbnQgPSBjb250YWluZXJSZWYuY3VycmVudC5xdWVyeVNlbGVjdG9yPEhUTUxEaXZFbGVtZW50PihcIi5jYXJvdXNlbC10cmFja1wiKTtcbiAgICAgIGNvbnN0IGZpcnN0SXRlbSA9IHRyYWNrRWxlbWVudD8ucXVlcnlTZWxlY3RvcjxIVE1MRGl2RWxlbWVudD4oXCIuY2Fyb3VzZWwtaXRlbVwiKTtcbiAgICAgIGNvbnN0IGNvbnRhaW5lcldpZHRoID0gY29udGFpbmVyUmVmLmN1cnJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG5cbiAgICAgIC8vIENhbGN1bGF0ZSBzcGFjZSBhdmFpbGFibGUgZm9yIHRodW1ibmFpbHMgKHRvdGFsIHdpZHRoIG1pbnVzIGFycm93IGJ1dHRvbnMgYW5kIG1hcmdpbnMpXG4gICAgICBjb25zdCByZXNlcnZlZEZvckFycm93cyA9IDIgKiAoYXJyb3dXaWR0aCArIDIwKTsgLy8gMjBweCBtYXJnaW4gb24gZWFjaCBzaWRlXG4gICAgICBjb25zdCBhdmFpbGFibGVGb3JUcmFjayA9IE1hdGgubWF4KDAsIGNvbnRhaW5lcldpZHRoIC0gcmVzZXJ2ZWRGb3JBcnJvd3MpO1xuXG4gICAgICAvLyBVc2UgZGVmYXVsdCBkaW1lbnNpb25zIGluaXRpYWxseVxuICAgICAgbGV0IGFjdHVhbFRodW1ibmFpbFdpZHRoID0gdGh1bWJuYWlsV2lkdGg7XG4gICAgICBsZXQgYWN0dWFsR2FwID0gZ2FwO1xuXG4gICAgICAvLyBJZiBpdGVtcyBhcmUgcmVuZGVyZWQsIG1lYXN1cmUgdGhlaXIgYWN0dWFsIGRpbWVuc2lvbnMgZnJvbSB0aGUgRE9NXG4gICAgICBpZiAoZmlyc3RJdGVtICYmIHRyYWNrRWxlbWVudCkge1xuICAgICAgICBjb25zdCBmaXJzdEl0ZW1SZWN0ID0gZmlyc3RJdGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAvLyBPbmx5IHVzZSBtZWFzdXJlZCB3aWR0aCBpZiB2YWxpZCAoZ3JlYXRlciB0aGFuIDApXG4gICAgICAgIGlmIChmaXJzdEl0ZW1SZWN0LndpZHRoID4gMCkgYWN0dWFsVGh1bWJuYWlsV2lkdGggPSBmaXJzdEl0ZW1SZWN0LndpZHRoO1xuXG4gICAgICAgIC8vIEdldCB0aGUgYWN0dWFsIGdhcCB2YWx1ZSBmcm9tIENTU1xuICAgICAgICBjb25zdCB0cmFja1N0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRyYWNrRWxlbWVudCk7XG4gICAgICAgIGNvbnN0IGdhcFZhbHVlID0gdHJhY2tTdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZShcImdhcFwiKSB8fCBcIjhweFwiO1xuICAgICAgICBjb25zdCBwYXJzZWRHYXAgPSBwYXJzZUZsb2F0KGdhcFZhbHVlKTtcbiAgICAgICAgaWYgKCFOdW1iZXIuaXNOYU4ocGFyc2VkR2FwKSkgYWN0dWFsR2FwID0gcGFyc2VkR2FwO1xuICAgICAgfVxuXG4gICAgICAvLyBDYWxjdWxhdGUgaG93IG1hbnkgY29tcGxldGUgaXRlbXMgZml0IGluIHRoZSBhdmFpbGFibGUgc3BhY2VcbiAgICAgIGNvbnN0IGNvdW50ID0gTWF0aC5mbG9vcigoYXZhaWxhYmxlRm9yVHJhY2sgKyBhY3R1YWxHYXApIC8gKGFjdHVhbFRodW1ibmFpbFdpZHRoICsgYWN0dWFsR2FwKSk7XG4gICAgICBjb25zdCBmaW5hbENvdW50ID0gY291bnQgPiAwID8gY291bnQgOiAxOyAvLyBFbnN1cmUgYXQgbGVhc3QgMSBpdGVtIGlzIHZpc2libGVcblxuICAgICAgLy8gVXBkYXRlIHZpc2libGUgY291bnQgYW5kIGFkanVzdCBzY3JvbGwgcG9zaXRpb24gaWYgbmVlZGVkXG4gICAgICBzZXRWaXNpYmxlQ291bnQoKHByZXZDb3VudCkgPT4ge1xuICAgICAgICBpZiAocHJldkNvdW50ICE9PSBmaW5hbENvdW50KSB7XG4gICAgICAgICAgLy8gQWRqdXN0IGN1cnJlbnRJbmRleCBpZiBpdCBleGNlZWRzIHRoZSBuZXcgbWF4IGluZGV4XG4gICAgICAgICAgY29uc3QgbmV3TWF4SW5kZXggPSBNYXRoLm1heCgwLCBpdGVtcy5sZW5ndGggLSBmaW5hbENvdW50KTtcbiAgICAgICAgICBzZXRDdXJyZW50SW5kZXgoKHByZXZJbmRleCkgPT4gTWF0aC5taW4ocHJldkluZGV4LCBuZXdNYXhJbmRleCkpO1xuICAgICAgICAgIHJldHVybiBmaW5hbENvdW50O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcmV2Q291bnQ7XG4gICAgICB9KTtcblxuICAgICAgLy8gRGV0ZXJtaW5lIGlmIGl0ZW1zIHNob3VsZCBiZSBjZW50ZXJlZCAod2hlbiB0aGV5IGRvbid0IGZpbGwgdGhlIGVudGlyZSB0cmFjayB3aWR0aClcbiAgICAgIGNvbnN0IHZpc2libGVJdGVtcyA9IE1hdGgubWluKGl0ZW1zLmxlbmd0aCwgZmluYWxDb3VudCk7XG4gICAgICBjb25zdCB0b3RhbFZpc2libGVXaWR0aCA9IHZpc2libGVJdGVtcyAqIChhY3R1YWxUaHVtYm5haWxXaWR0aCArIGFjdHVhbEdhcCkgLSBhY3R1YWxHYXA7XG4gICAgICBzZXRJc0NlbnRlcmVkKHRvdGFsVmlzaWJsZVdpZHRoIDw9IGF2YWlsYWJsZUZvclRyYWNrKTtcbiAgICB9O1xuXG4gICAgLy8gSW5pdGlhbCBjYWxjdWxhdGlvbiBvbiBtb3VudFxuICAgIHVwZGF0ZVZpc2libGVDb3VudCgpO1xuXG4gICAgLy8gV2F0Y2ggZm9yIGNvbnRhaW5lciBzaXplIGNoYW5nZXMgdXNpbmcgUmVzaXplT2JzZXJ2ZXJcbiAgICBsZXQgcmVzaXplT2JzZXJ2ZXI6IFJlc2l6ZU9ic2VydmVyIHwgbnVsbCA9IG51bGw7XG4gICAgaWYgKGNvbnRhaW5lclJlZi5jdXJyZW50KSB7XG4gICAgICByZXNpemVPYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcih1cGRhdGVWaXNpYmxlQ291bnQpO1xuICAgICAgcmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZShjb250YWluZXJSZWYuY3VycmVudCk7XG4gICAgfVxuXG4gICAgLy8gQWxzbyBsaXN0ZW4gZm9yIHdpbmRvdyByZXNpemUgZXZlbnRzIGFzIGEgZmFsbGJhY2tcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB1cGRhdGVWaXNpYmxlQ291bnQpO1xuXG4gICAgLy8gQ2xlYW51cCBsaXN0ZW5lcnMgb24gdW5tb3VudFxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB1cGRhdGVWaXNpYmxlQ291bnQpO1xuICAgICAgcmVzaXplT2JzZXJ2ZXI/LmRpc2Nvbm5lY3QoKTtcbiAgICB9O1xuICB9LCBbaXRlbXMubGVuZ3RoXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAvLyBTZXQgYWN0aXZlIGluZGV4IGJhc2VkIG9uIHNlbGVjdGVkRG9jdW1lbnRJZCBieSBtYXRjaGluZyBpbnN0YW5jZUlkXG4gICAgY29uc3QgZG9jdW1lbnRJZCA9IHNlbGVjdGVkRG9jdW1lbnRJZD8udmFsdWU/LnRvU3RyaW5nKCk7XG5cbiAgICBpZiAoIWRvY3VtZW50SWQgfHwgIWRvY3VtZW50TGlzdD8uaXRlbXMpIHtcbiAgICAgIHNldEFjdGl2ZUluZGV4KC0xKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBGaW5kIHRoZSBpbmRleCBvZiB0aGUgZG9jdW1lbnQgd2l0aCBtYXRjaGluZyBpbnN0YW5jZUlkXG4gICAgY29uc3QgbWF0Y2hpbmdJbmRleCA9IGRvY3VtZW50TGlzdC5pdGVtcy5maW5kSW5kZXgoKGl0ZW06IGFueSkgPT4ge1xuICAgICAgY29uc3QgaXRlbUluc3RhbmNlSWQgPSBpbnN0YW5jZUlkPy5nZXQoaXRlbSk/LnZhbHVlO1xuICAgICAgcmV0dXJuIGl0ZW1JbnN0YW5jZUlkICYmIGl0ZW1JbnN0YW5jZUlkID09PSBkb2N1bWVudElkO1xuICAgIH0pO1xuXG4gICAgaWYgKG1hdGNoaW5nSW5kZXggIT09IC0xKSB7XG4gICAgICBzZXRBY3RpdmVJbmRleChtYXRjaGluZ0luZGV4KTtcblxuICAgICAgLy8gU2Nyb2xsIHRvIG1ha2UgdGhlIHNlbGVjdGVkIGRvY3VtZW50IHZpc2libGUgaWYgaXQncyBub3QgaW4gdGhlIGN1cnJlbnQgdmlld1xuICAgICAgY29uc3QgaXNJblZpZXcgPSBtYXRjaGluZ0luZGV4ID49IGN1cnJlbnRJbmRleCAmJiBtYXRjaGluZ0luZGV4IDwgY3VycmVudEluZGV4ICsgdmlzaWJsZUNvdW50O1xuICAgICAgaWYgKCFpc0luVmlldykge1xuICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIGJlc3Qgc2Nyb2xsIHBvc2l0aW9uIHRvIGNlbnRlciB0aGUgc2VsZWN0ZWQgaXRlbVxuICAgICAgICBjb25zdCBuZXdJbmRleCA9IE1hdGgubWF4KDAsIE1hdGgubWluKG1hdGNoaW5nSW5kZXggLSBNYXRoLmZsb29yKHZpc2libGVDb3VudCAvIDIpLCBpdGVtcy5sZW5ndGggLSB2aXNpYmxlQ291bnQpKTtcbiAgICAgICAgc2V0Q3VycmVudEluZGV4KG5ld0luZGV4KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc2V0QWN0aXZlSW5kZXgoLTEpO1xuICAgIH1cbiAgfSwgW3NlbGVjdGVkRG9jdW1lbnRJZCwgZG9jdW1lbnRMaXN0LCB2aXNpYmxlQ291bnQsIHRodW1ibmFpbENsaWNrQWN0aW9uXSk7XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgdGh1bWJuYWlsIGNsaWNrIGV2ZW50c1xuICAgKiBTZXRzIHRoZSBjbGlja2VkIGl0ZW0gYXMgYWN0aXZlIGFuZCBsb2dzIHRoZSBpbnRlcmFjdGlvblxuICAgKi9cbiAgY29uc3QgaGFuZGxlVGh1bWJuYWlsQ2xpY2sgPSAoZ2xvYmFsSW5kZXg6IG51bWJlciwgaXRlbTogQ2Fyb3VzZWxJdGVtKSA9PiB7XG4gICAgLy8gUHJldmVudCBhY3Rpb24gZXhlY3V0aW9uIGlmIGNsaWNraW5nIG9uIHRoZSBhbHJlYWR5IGFjdGl2ZSBpdGVtXG4gICAgY29uc3QgaXNBbHJlYWR5QWN0aXZlID0gZ2xvYmFsSW5kZXggPT09IGFjdGl2ZUluZGV4O1xuXG4gICAgaWYgKGlzQWxyZWFkeUFjdGl2ZSkge1xuICAgICAgY29uc29sZS5sb2coXCJJdGVtIGFscmVhZHkgYWN0aXZlLCBpZ25vcmluZyBjbGljazpcIiwge1xuICAgICAgICBpbmRleDogZ2xvYmFsSW5kZXgsXG4gICAgICAgIGlkZW50aWZpZXI6IGl0ZW0udGl0bGUsXG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzZXRBY3RpdmVJbmRleChnbG9iYWxJbmRleCk7XG5cbiAgICBjb25zb2xlLmxvZyhcIlRodW1ibmFpbCBjbGlja2VkOlwiLCB7XG4gICAgICBpbmRleDogZ2xvYmFsSW5kZXgsXG4gICAgICBpZGVudGlmaWVyOiBpdGVtLnRpdGxlLFxuICAgICAgaXRlbSxcbiAgICB9KTtcblxuICAgIGlmICghdGh1bWJuYWlsQ2xpY2tBY3Rpb24pIHtcbiAgICAgIGNvbnNvbGUud2FybihcIlRodW1ibmFpbCBDbGljayBBY3Rpb24gaXMgbm90IGRlZmluZWQuXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHRodW1ibmFpbEFjdGlvbiA9IHRodW1ibmFpbENsaWNrQWN0aW9uLmdldD8uKGRvY3VtZW50TGlzdC5pdGVtc1tnbG9iYWxJbmRleF0pO1xuXG4gICAgaWYgKHRodW1ibmFpbEFjdGlvbj8uY2FuRXhlY3V0ZSkge1xuICAgICAgdGh1bWJuYWlsQWN0aW9uLmV4ZWN1dGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS53YXJuKFwiVGh1bWJuYWlsIGFjdGlvbiBjYW5ub3QgYmUgZXhlY3V0ZWQgb3IgaXMgbm90IGF2YWlsYWJsZS5cIik7XG4gICAgfVxuICB9O1xuXG4gIC8vIENhbGN1bGF0ZSB0aGUgbWF4aW11bSBzY3JvbGwgcG9zaXRpb24gKGxhc3QgcGFnZSBvZiBpdGVtcylcbiAgY29uc3QgbWF4SW5kZXggPSBNYXRoLm1heCgwLCBpdGVtcy5sZW5ndGggLSB2aXNpYmxlQ291bnQpO1xuICAvLyBEZXRlcm1pbmUgaWYgbmF2aWdhdGlvbiBidXR0b25zIHNob3VsZCBiZSBlbmFibGVkXG4gIGNvbnN0IGNhbkdvTmV4dCA9IGN1cnJlbnRJbmRleCA8IG1heEluZGV4O1xuICBjb25zdCBjYW5Hb1ByZXYgPSBjdXJyZW50SW5kZXggPiAwO1xuXG4gIC8qKlxuICAgKiBOYXZpZ2F0ZXMgdG8gdGhlIG5leHQgc2xpZGUgKHNjcm9sbHMgcmlnaHQgYnkgb25lIGl0ZW0pXG4gICAqL1xuICBjb25zdCBuZXh0U2xpZGUgPSAoKSA9PiB7XG4gICAgaWYgKGNhbkdvTmV4dCkge1xuICAgICAgc2V0Q3VycmVudEluZGV4KChwcmV2SW5kZXgpID0+IE1hdGgubWluKHByZXZJbmRleCArIDEsIG1heEluZGV4KSk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBOYXZpZ2F0ZXMgdG8gdGhlIHByZXZpb3VzIHNsaWRlIChzY3JvbGxzIGxlZnQgYnkgb25lIGl0ZW0pXG4gICAqL1xuICBjb25zdCBwcmV2U2xpZGUgPSAoKSA9PiB7XG4gICAgaWYgKGNhbkdvUHJldikge1xuICAgICAgc2V0Q3VycmVudEluZGV4KChwcmV2SW5kZXgpID0+IE1hdGgubWF4KHByZXZJbmRleCAtIDEsIDApKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHN1YnNldCBvZiBpdGVtcyB0aGF0IHNob3VsZCBiZSB2aXNpYmxlIGJhc2VkIG9uIGN1cnJlbnQgc2Nyb2xsIHBvc2l0aW9uXG4gICAqL1xuICBjb25zdCBnZXRWaXNpYmxlSXRlbXMgPSAoKTogQ2Fyb3VzZWxJdGVtW10gPT4ge1xuICAgIC8vIFNob3cgYWxsIGl0ZW1zIGlmIHRoZXkgZml0IHdpdGhpbiB0aGUgdmlzaWJsZSBhcmVhXG4gICAgaWYgKGl0ZW1zLmxlbmd0aCA8PSB2aXNpYmxlQ291bnQpIHJldHVybiBpdGVtcztcbiAgICAvLyBJZiBzY3JvbGxlZCBwYXN0IHRoZSBlbmQsIHNob3cgdGhlIGxhc3QgcGFnZSBvZiBpdGVtc1xuICAgIGlmIChjdXJyZW50SW5kZXggPiBpdGVtcy5sZW5ndGggLSB2aXNpYmxlQ291bnQpIHtcbiAgICAgIHJldHVybiBpdGVtcy5zbGljZShpdGVtcy5sZW5ndGggLSB2aXNpYmxlQ291bnQpO1xuICAgIH1cbiAgICAvLyBOb3JtYWwgY2FzZTogc2hvdyBpdGVtcyBzdGFydGluZyBmcm9tIGN1cnJlbnRJbmRleFxuICAgIHJldHVybiBpdGVtcy5zbGljZShjdXJyZW50SW5kZXgsIGN1cnJlbnRJbmRleCArIHZpc2libGVDb3VudCk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJvdXNlbC1jb250YWluZXJcIiByZWY9e2NvbnRhaW5lclJlZn0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2Fyb3VzZWwtaW5uZXJcIj5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFycm93IGxlZnRcIiBvbkNsaWNrPXtwcmV2U2xpZGV9IGRpc2FibGVkPXshY2FuR29QcmV2fT5cbiAgICAgICAgICAgIDxpbWcgc3JjPXtyZXF1aXJlKFwiLi4vaWNvbnMvbWlzY0NoZXZyb25MZWZ0MjQuc3ZnXCIpfSBhbHQ9XCJQcmV2aW91c1wiIC8+XG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGNhcm91c2VsLXRyYWNrJHtpc0NlbnRlcmVkID8gXCIgY2VudGVyXCIgOiBcIlwifWB9PlxuICAgICAgICAgICAge2dldFZpc2libGVJdGVtcygpLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBnbG9iYWwgaW5kZXggKHBvc2l0aW9uIGluIGZ1bGwgaXRlbXMgYXJyYXkpIGZyb20gbG9jYWwgaW5kZXhcbiAgICAgICAgICAgICAgY29uc3QgZ2xvYmFsSW5kZXggPVxuICAgICAgICAgICAgICAgIGl0ZW1zLmxlbmd0aCA8PSB2aXNpYmxlQ291bnRcbiAgICAgICAgICAgICAgICAgID8gaW5kZXggLy8gQWxsIGl0ZW1zIHZpc2libGU6IGxvY2FsIGluZGV4IGVxdWFscyBnbG9iYWwgaW5kZXhcbiAgICAgICAgICAgICAgICAgIDogY3VycmVudEluZGV4ID4gaXRlbXMubGVuZ3RoIC0gdmlzaWJsZUNvdW50XG4gICAgICAgICAgICAgICAgICAgID8gaXRlbXMubGVuZ3RoIC0gdmlzaWJsZUNvdW50ICsgaW5kZXggLy8gQXQgZW5kOiBvZmZzZXQgZnJvbSBsYXN0IHBhZ2VcbiAgICAgICAgICAgICAgICAgICAgOiBjdXJyZW50SW5kZXggKyBpbmRleDsgLy8gTm9ybWFsOiBvZmZzZXQgYnkgY3VycmVudCBzY3JvbGwgcG9zaXRpb25cblxuICAgICAgICAgICAgICAvLyBDaGVjayBpZiB0aGlzIGl0ZW0gbWF0Y2hlcyB0aGUgc2VsZWN0ZWQgZG9jdW1lbnRcbiAgICAgICAgICAgICAgY29uc3QgaXRlbUluc3RhbmNlSWQgPSBkb2N1bWVudExpc3QuaXRlbXNbZ2xvYmFsSW5kZXhdID8gaW5zdGFuY2VJZD8uZ2V0KGRvY3VtZW50TGlzdC5pdGVtc1tnbG9iYWxJbmRleF0pPy52YWx1ZSA6IG51bGw7XG4gICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkSWQgPSBzZWxlY3RlZERvY3VtZW50SWQ/LnZhbHVlPy50b1N0cmluZygpO1xuICAgICAgICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gaXRlbUluc3RhbmNlSWQgJiYgc2VsZWN0ZWRJZCAmJiBpdGVtSW5zdGFuY2VJZCA9PT0gc2VsZWN0ZWRJZDtcblxuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgIGtleT17Z2xvYmFsSW5kZXh9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BjYXJvdXNlbC1pdGVtJHtnbG9iYWxJbmRleCA9PT0gYWN0aXZlSW5kZXggPyBcIiBhY3RpdmVcIiA6IFwiXCJ9JHtpc1NlbGVjdGVkID8gXCIgc2VsZWN0ZWRcIiA6IFwiXCJ9YH1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVRodW1ibmFpbENsaWNrKGdsb2JhbEluZGV4LCBpdGVtKX1cbiAgICAgICAgICAgICAgICAgIGRhdGEtaWQ9e2dsb2JhbEluZGV4fVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXtpdGVtLmljb259IGFsdD17aXRlbS50aXRsZX0gY2xhc3NOYW1lPVwiaXRlbS1pY29uXCIgLz5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIml0ZW0tdGl0bGVcIiB0aXRsZT17aXRlbS50aXRsZX0+e2l0ZW0udGl0bGV9PC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImFycm93IHJpZ2h0XCIgb25DbGljaz17bmV4dFNsaWRlfSBkaXNhYmxlZD17IWNhbkdvTmV4dH0+XG4gICAgICAgICAgICA8aW1nIHNyYz17cmVxdWlyZShcIi4uL2ljb25zL21pc2NDaGV2cm9uUmlnaHQyNC5zdmdcIil9IGFsdD1cIk5leHRcIiAvPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2Fyb3VzZWw7XG4iLCJpbXBvcnQgeyBSZWFjdEVsZW1lbnQsIGNyZWF0ZUVsZW1lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IENhcm91c2VsV2lkZ2V0Q29udGFpbmVyUHJvcHMgfSBmcm9tIFwiLi4vdHlwaW5ncy9DYXJvdXNlbFdpZGdldFByb3BzXCI7XG5cbmltcG9ydCBcIi4vdWkvQ2Fyb3VzZWxXaWRnZXQuY3NzXCI7XG5pbXBvcnQgQ2Fyb3VzZWwgZnJvbSBcIi4vY29tcG9uZW50cy9DYXJvdXNlbFwiO1xuXG5leHBvcnQgZnVuY3Rpb24gQ2Fyb3VzZWxXaWRnZXQoe2RvY3VtZW50TGlzdCwgZGlzcGxheU5hbWUsZG9jdW1lbnRJY29uLGluc3RhbmNlSWQsc2VsZWN0ZWREb2N1bWVudElkLCB0aHVtYm5haWxDbGlja0FjdGlvbiB9OiBDYXJvdXNlbFdpZGdldENvbnRhaW5lclByb3BzKTogUmVhY3RFbGVtZW50IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1jYXJvdXNlbFwiPlxuICAgICAgPENhcm91c2VsIGRvY3VtZW50TGlzdD17ZG9jdW1lbnRMaXN0fSBkaXNwbGF5TmFtZT17ZGlzcGxheU5hbWV9IGRvY3VtZW50SWNvbj17ZG9jdW1lbnRJY29ufSBpbnN0YW5jZUlkPXtpbnN0YW5jZUlkfSBzZWxlY3RlZERvY3VtZW50SWQ9e3NlbGVjdGVkRG9jdW1lbnRJZH0gdGh1bWJuYWlsQ2xpY2tBY3Rpb249e3RodW1ibmFpbENsaWNrQWN0aW9ufSAvPlxuICAgIDwvZGl2PlxuICApO1xufVxuIl0sIm5hbWVzIjpbInVzZVN0YXRlIiwidXNlUmVmIiwidXNlRWZmZWN0IiwiY3JlYXRlRWxlbWVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxnQkFBZTs7Ozs7Ozs7O0FDQWYsaUJBQWU7Ozs7Ozs7OztBQ0FmLG9CQUFlOzs7Ozs7Ozs7QUNBZixxQkFBZTs7Ozs7Ozs7O0FDQWYsMEJBQWU7Ozs7Ozs7OztBQ0FmLGlCQUFlOzs7Ozs7Ozs7QUNBZixpQkFBZTs7Ozs7Ozs7O0FDQWYsa0JBQWU7Ozs7Ozs7OztBQ0FmLGlCQUFlOzs7Ozs7Ozs7QUNBZixpQkFBZTs7Ozs7Ozs7O0FDQWYsaUJBQWU7Ozs7Ozs7OztBQ0FmLHFCQUFlOzs7Ozs7Ozs7QUNBZix5QkFBZTs7Ozs7Ozs7O0FDQWYsMEJBQWU7Ozs7Ozs7OztDQ3NCZixNQUFNLFFBQVEsR0FBK0ksQ0FBQyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxrQkFBa0IsRUFBRSxvQkFBb0IsRUFBRSxLQUFJOztDQUVqUSxJQUFBLE1BQU0sUUFBUSxHQUF3QjtDQUNwQyxRQUFBLGNBQWMsRUFBRSxVQUFnQztDQUNoRCxRQUFBLGVBQWUsRUFBRSxVQUFpQztDQUNsRCxRQUFBLGtCQUFrQixFQUFFLFVBQW9DO0NBQ3hELFFBQUEsbUJBQW1CLEVBQUUsVUFBcUM7Q0FDMUQsUUFBQSx3QkFBd0IsRUFBRSxVQUEwQztDQUNwRSxRQUFBLGVBQWUsRUFBRSxVQUFpQztDQUNsRCxRQUFBLGVBQWUsRUFBRSxVQUFpQztDQUNsRCxRQUFBLGdCQUFnQixFQUFFLFVBQWtDO0NBQ3BELFFBQUEsZUFBZSxFQUFFLFVBQWlDO0NBQ2xELFFBQUEsZUFBZSxFQUFFLFVBQWlDO0NBQ2xELFFBQUEsZUFBZSxFQUFFLFdBQWlDO0NB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
