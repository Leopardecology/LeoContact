import {Link} from 'react-router-dom';

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">LeoContact</span></h1>
            </header>
            <main className="public__main">
                <p>Mauris egestas tincidunt nisl vel gravida. Sed lorem lectus, congue non purus sed, suscipit euismod
                    tortor. Nullam in blandit arcu, in dictum urna. Donec ultrices id nisi in egestas. Praesent interdum
                    risus eu augue laoreet interdum. </p>
                <address className="public__addr">
                    Blub D. Blub<br/>
                    555 Blub Drive<br/>
                    Blub City, Blub 12345<br/>
                    <a href="tel:+41 79 999 99 99">+4179 999 99 99</a>
                </address>
                <br/>
                <p>Owner: Pipo</p>
            </main>
            <footer>
                <Link to="/login">User Login</Link>
            </footer>
        </section>

    );
    return content;
};

export default Public;