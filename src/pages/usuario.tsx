// UserInfo.tsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IUser } from "@/interfaces/user.interface";
import { getUserById } from "@/api/userApi";
import Layout from "@/components/Layout";
import { UserMapper } from "@/mappers/user.mapper";
import Loading from "@/components/Loader";
const UserInfo: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState<IUser | null>(null);

  const [loading, setLoading] = useState();
  useEffect(() => {
    setLoading(true);
    if (id) {
      getUserById(id as string).then((data) => {
        setUser(data);
        setLoading(false);
      });
    }
  }, [id]);

  return (
    <Layout>
      <Loading loading={loading} />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Información de usuario</h1>
        <div className="bg-white shadow-md rounded p-4">
          <p>
            <strong>ID:</strong> {user?.id}
          </p>
          <p>
            <strong>Nombre:</strong> {user?.name}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Rol:</strong> {UserMapper.mapRole(user?.role)}
          </p>
          <p>
            <strong>Empresa:</strong> {}
          </p>
          <p>
            <strong>Fecha de registro:</strong>{" "}
            {new Date(user?.createdAt).toLocaleDateString()}
          </p>
          <p>
            <strong>Verificado:</strong> {user?.isVerified ? "Sí" : "No"}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default UserInfo;