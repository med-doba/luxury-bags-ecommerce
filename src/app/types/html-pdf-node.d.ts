declare module "html-pdf-node" {
  export interface PdfOptions {
    format?: string;
    width?: string | number;
    height?: string | number;
    margin?: {
      top?: string | number;
      right?: string | number;
      bottom?: string | number;
      left?: string | number;
    };
    printBackground?: boolean;
    landscape?: boolean;
    scale?: number;
    path?: string;
    displayHeaderFooter?: boolean;
    headerTemplate?: string;
    footerTemplate?: string;
    pageRanges?: string;
    preferCSSPageSize?: boolean;
  }

  export interface FileContent {
    content?: string;
    url?: string;
  }

  export function generatePdf(
    file: FileContent,
    options: PdfOptions
  ): Promise<Buffer>;
}
