 
import styled from "styled-components";
import { deviceSize } from "../../components/responsive/index";
import  TopSectionBackgroundImg from "../../imeges/bg-img.jpg";
 
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
  ondelete?: boolean;
  children2?: React.ReactNode;
}


const Top=({ children,className,ondelete,children2 }: TopProps)=>{
  console.log("ondelete",ondelete);
    return (
    
    <TopSectionContainer>
         <BackgroundFilter>
       <div className={`${className} ${ondelete ? '' : 'hide'}`} onClick={() => {
         if (!ondelete) {
           const childrenDiv = document.querySelector(`.${className}:first-child`);
           const children2Div = document.querySelector(`.${className}:last-child`);
           if (childrenDiv && children2Div) {
             childrenDiv.classList.remove('hide');
             children2Div.classList.add('hide');
           }
         }
       }}>{children}</div>
       <div className={`${className} ${ondelete ? 'hide' : ''}`}>{children2}</div>
        </BackgroundFilter>
    </TopSectionContainer>
   

    )

}
export default Top