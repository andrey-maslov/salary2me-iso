import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        const locale = await ctx.req.locale
        return { ...initialProps, locale }
    }

    render() {
        return (
            // @ts-ignore
            <Html lang={this.props.locale || ''}>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
