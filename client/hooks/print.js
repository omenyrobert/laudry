export const usePrint = () => {
  const printContent = (id) => {
    const table = document.getElementById(id);
    const myWindow = window.open("", "", "width=900,height=700");
    myWindow.document.write(table.outerHTML);

    const stylesheets = Array.from(document.styleSheets);

    stylesheets.forEach((stylesheet) => {
      myWindow.document.head.appendChild(stylesheet.ownerNode.cloneNode(true));
    });

    const links = Array.from(document.getElementsByTagName("link"));

    links.forEach((link) => {
      myWindow.document.head.appendChild(link.cloneNode(true));
    });

    setTimeout(() => {
      myWindow.print();
    }, 1000);
  };

  return { printContent };
}
