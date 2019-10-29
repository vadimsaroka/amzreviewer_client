import Layout from "../components/Layout";
import { useRouter } from "next/router";
import ResetPasswordPage from "../components/ResetPasswordPage";

const ResetPassword = () => {
  const router = useRouter();
  const { token } = router.query;
  return (
    <Layout>
      <ResetPasswordPage token={token}/>
    </Layout>
  );
};

export default ResetPassword;
