import { Alert, Button } from 'antd';

const ErrorAlert = ({ error, handleRetry }) => {

    return <Alert
        className="error-alert"
        message="Error"
        description={error}
        type="error"
        action={
            <Button size="small" type="primary" onClick={handleRetry}>
                Retry
            </Button>
        }
        closable
    />;
}
export default ErrorAlert;