export const escapeMarkdown = (text: string): string =>
  text.replace(/([-_*\[\]()~`>#+=|{}.!\\])/g, "\\$1");
