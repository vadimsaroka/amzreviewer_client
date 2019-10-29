import Layout from "../components/Layout";
import { useRouter } from "next/router";
import EditReviewPage from "../components/EditReviewPage";

const EditReview = () => {
  const router = useRouter();
  return (
    <Layout>
      <EditReviewPage id={router.query.id}/>
    </Layout>
  );
};

export default EditReview;
