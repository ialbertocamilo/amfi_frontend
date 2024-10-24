import { useEffect, useState } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { FaBars } from "react-icons/fa";
import DetalleProyectoLista from "@/components/DetalleProyecto/DetalleProyectoLista";
import Layout from "@/components/Layout";
import { getProjectById } from "@/api/projectApi";
import { useRouter } from "next/router";

const DetalleProyecto = () => {

  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
      <div className="flex-1 flex flex-col">
        <DetalleProyectoLista id={id as string}/>
      </div>
    </Layout>
  );
};

export default DetalleProyecto;
