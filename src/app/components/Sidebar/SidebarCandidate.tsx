"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-blue-950 shadow-lg z-50 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <button onClick={onClose} className="p-4 text-white">
        X
      </button>
      <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 min-vh-100 sticky-top">
        <ul
          className="navbar navbar-nav flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
          id="menu"
        >
          <li className="nav-item">
            <Link
              href="/candidate/edit"
              className="nav-link d-flex align-items-center"
              id="dropdownUser1"
            >
              <Image
                src="/AlcoSloganLogo.png"
                alt="hugenerd"
                width={30}
                height={30}
                className="rounded-circle"
              />
              <span className="text-white d-none d-sm-inline mx-1">
                Ver Perfil
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/candidate/oportunidades"
              className="nav-link align-middle d-flex align-items-center"
            >
              <FontAwesomeIcon
                className="text-white"
                icon={faMagnifyingGlass}
                width="30"
                height="30"
              />
              <span className="ms-1 text-white d-none d-sm-inline">
                Oportunidades
              </span>
            </Link>
          </li>
          <li>
            <a
              href="#"
              className="nav-link align-middle d-flex align-items-center"
            >
              <FontAwesomeIcon
                className="text-white"
                icon={faMagnifyingGlass}
                width="30"
                height="30"
              />
              <span className="ms-1 text-white d-none d-sm-inline">
                Empleos aplicados
              </span>
            </a>
          </li>{" "}
        
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
