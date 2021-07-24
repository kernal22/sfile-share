export interface ISendMail {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: any;
}
