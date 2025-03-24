import Header from "@/components/Header";
import Aside from "@/components/Aside";

function ParentComponent(props) {


    return (
        <div>
         <Header handleAsideOpen={props.appAsideOpen}/>
            <Aside asideOpen={props.appOpen} handleAsideOpen={props.appAsideOpen}/>
        </div>
    );
}

export default ParentComponent;
