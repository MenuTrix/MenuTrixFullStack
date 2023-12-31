import { useEffect, useState } from 'react';
import EveryInfo from '../../components/EveryInfo';
import SideBar from '../../components/SideBar';
import TopBar from '../../components/TopBar/index';
import {
  ContainerInfos,
  ContentContainer,
  MainContainer,
  SecondContainer,
  TitlePage,
} from './style';
import useToken from '../../hooks/useToken';
import { toast } from 'react-toastify';
import { User, getUser } from '../../services/userApi';

export function DataAndSecurity() {
  const token = useToken();
  const [userData, setUserData] = useState<undefined | User>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getUserData();
  }, [loading]);

  console.log(loading);

  console.log(userData);

  async function getUserData(): Promise<void> {
    try {
      console.log('entrou!');
      const response = await getUser(token);
      setUserData(response);
    } catch (error) {
      console.log(error);
      toast.error('Erro ao tentar carregar as informações! Atualize a página!');
    }
  }

  return (
    <MainContainer>
      <TopBar />
      <SecondContainer>
        <SideBar page='dataAndSecurity' />
        <ContentContainer>
          <TitlePage>Dados e Segurança</TitlePage>
          <ContainerInfos>
            {userData && (
              <>
                <EveryInfo
                  title={'name'}
                  info={userData?.name}
                  userData={userData}
                  setUserData={setUserData}
                  loading={loading}
                  setLoading={setLoading}
                />
                <EveryInfo
                  title={'email'}
                  info={userData?.email}
                  userData={userData}
                  setUserData={setUserData}
                  loading={loading}
                  setLoading={setLoading}
                />
                <EveryInfo
                  title={'cpf'}
                  info={userData?.cpf}
                  userData={userData}
                  setUserData={setUserData}
                  loading={loading}
                  setLoading={setLoading}
                />
                <EveryInfo
                  title={'password'}
                  info={userData?.password}
                  userData={userData}
                  setUserData={setUserData}
                  loading={loading}
                  setLoading={setLoading}
                />
              </>
            )}
          </ContainerInfos>
        </ContentContainer>
      </SecondContainer>
    </MainContainer>
  );
}
