import "./ErrorMsg.css";

const ErrorMsg = ({ children }: { children: string }) => (
  <div className="container">{children}</div>
);
export default ErrorMsg;
