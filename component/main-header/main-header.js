
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png";
import style from "./main-header.module.css";
import MainHeaderBackground from "./main-header-background";
import NavLink from "./nav-link";

function MainHeader() {
	return (
		<>
			<MainHeaderBackground />
			<header className={style.header}>
				<Link className={style.logo} href={"/"}>
					<Image src={logo} priority />
					NextLevel Food
				</Link>

				<nav className={style.nav}>
					<ul>
						<li>
							<NavLink  href={"/meals"}>Brows meals</NavLink>
						</li>
						<li>
							<NavLink href={"/community"}>Join the community</NavLink>
						</li>
					</ul>
				</nav>
			</header>
		</>
	);
}

export default MainHeader;
