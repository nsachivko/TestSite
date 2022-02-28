export const _ = '_';
if (typeof window !== "undefined") {
    const links = Array.from(document.getElementsByTagName("a"));
    if (typeof links !== "undefined")
        links.forEach(link => {
            if (typeof link.target !== "undefined") {
                if (link.target === "_blank") {
                    link.setAttribute("rel", "noreferer noopener");
                }
            }
        });
};
export { };