import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 0;
  background: var(--color-primary);
`;

export const HeaderContent = styled.div`
  max-width: var(--max-x);
  margin: 0 auto;
  display: flex;
  align-items: center;

  > img {
    height: 80px;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;
  }

  svg {
    color: #999591;
    width: 20px;
    height: 20px;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;

    margin-left: 16px;

    line-height: 24px;

    span {
      color: var(--color-text);
    }

    strong {
      color: var(--color-orange);
    }
  }
`;

export const Content = styled.main`
  max-width: var(--max-x);
  margin: 64px auto;
  display: flex;
`;

export const Schedule = styled.div`
  flex: 1;
  margin-right: 120px;

  h1 {
    font-size: 36px;
  }

  p {
    margin-top: 8px;
    color: var(--color-orange);
    display: flex;
    font-weight: 500;
  }
  span {
    display: flex;
  }

  span + span::before {
    content: '';
    width: 1px;
    height: 12px;
    background: var(--color-orange);
    margin: 0 8px;
  }
`;

export const NextAppointmet = styled.div`
  margin-top: 64px;

  > strong {
    color: #999591;
    font-size: 20px;
    font-weight: 400;
  }

  div {
    background: var(--color-secondary);
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-top: 24px;
    position: relative;

    &::before {
      position: absolute;
      height: 80%;
      width: 1px;
      left: 0;
      top: 10%;
      content: '';
      background: var(--color-orange);
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: #fff;
    }

    span {
      margin-left: auto;
      display: flex;
      align-items: center;
      color: #999591;

      svg {
        color: var(--color-orange);
        margin: 8px;
      }
    }
  }
`;

export const Calendar = styled.aside`
  width: 380px;
`;
