import Link from "next/link"
import Links from "./navLinks/Links";
import LanguageSelector from "./LanguageSelector/LanguageSelector";
import ProfileSelector from "./ProfileSelector/ProfileSelector";

const NavBar = ({ locale }: { locale: string }) => {

    const links = [
        {
          title: 'About',
          path: '/about',
        },
        {
          title: 'Users',
          path: '/users',
        },
        {
          title: 'Combos',
          path: '/combos',
        },
        {
          title: 'Your Combos',
          path: '/your-combos',
        },
      ];

    return (
        <div className="fixed top-0 left-0 right-0 z-[10] w-full flex justify-center bg-[#212529] shadow-v2">
            <nav className={`w-[1000px] flex items-center justify-between text-white h-[60px] `}>
                <Link href={`/${locale}`} className="">Logo</Link>
                <Links locale={locale} />
                <div className="flex items-center gap-[20px] justify-between">
                    <LanguageSelector item={links[0]} locale={locale} />
                    <ProfileSelector locale={locale} />
                </div>
            </nav>
        </div>
    )
    }

export default NavBar;
