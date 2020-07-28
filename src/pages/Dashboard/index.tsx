import React from 'react';
import { FiPower, FiClock } from 'react-icons/fi';

import radomPerson from '../../assets/image.jpeg';
import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/AuthContext';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointmet,
  Calendar,
} from './styles';

const Dashboard: React.FC = () => {
  const { singOut, user } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="logo" />

          <Profile>
            <img src={radomPerson} alt="radom" />
            <div>
              <span>Bem-vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>
          <button type="button" onClick={singOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 6</span>
            <span>Segunda-feira</span>
          </p>
          <NextAppointmet>
            <strong>Atendimento a seguir</strong>
            <div>
              <img src={radomPerson} alt="Radom" />
              <strong>Davi Ribeiro</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointmet>
        </Schedule>
        <Calendar />
      </Content>
    </Container>
  );
};

export default Dashboard;
