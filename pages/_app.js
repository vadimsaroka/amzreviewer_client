import App, { Container } from "next/app";
import Head from "next/head";

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Head>
          <title>
            Amazon Review App | Helps keep track of your reviews
          </title>
          <meta
            name="description"
            content="This App makes easier to keep track of your reviews"
          />
          <meta
            name="keywords"
            content="Amazon review app"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Lato:300,300i,700"
          ></link>
        </Head>
        <Component {...pageProps} />
      </Container>
    );
  }
}
