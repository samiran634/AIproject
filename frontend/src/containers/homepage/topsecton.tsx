 
import styled from "styled-components";
import { deviceSize } from "../../components/responsive/index";
import  TopSectionBackgroundImg from "../../imeges/bg-img.jpg"
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
  children: React.ReactNode;
  className?: string;

}


const Top=({ children,className }: TopProps)=>{
    return (
     
    <TopSectionContainer>
         <BackgroundFilter>
       <div className= {className}>{children}</div>  
        </BackgroundFilter>
    </TopSectionContainer>
   

    )

}
export default Top