import styled from "styled-components";
import { deviceSize } from "../../components/responsive";
import TopSectionBackgroundImg from "../../images/bg-img.jpg";

const TopSectionContainer = styled.div`
  width: 100%;
  height: 800px;
  background: url(${TopSectionBackgroundImg}) no-repeat;
  background-position: 0px -150px;
  background-size: cover;

  @media screen and (max-width: ${deviceSize.mobile}px) {
    height: 700px;
    background-position: 0px 0px;
  }
`;

const BackgroundFilter = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(236,239,180,.88);
  display: flex;
  flex-direction: column;
`;

interface TopProps {
  children: React.ReactNode;   // chat-bot component
  className?: string;
  children2?: React.ReactNode;  // cards component
}

const Top = ({ children, className = '' , children2 }: TopProps) => {
 

  return (
    <TopSectionContainer>
      <BackgroundFilter>
        <div className={`${className}`}  >
          {children}  {/* Chat-bot component, affected by ondelete */}
        </div>
        <div className={className}>
          {children2}  {/* Cards component, always visible */}
        </div>
      </BackgroundFilter>
    </TopSectionContainer>
  );
};

export default Top;
