import { createDrawerNavigator } from "@react-navigation/drawer";
import StackAlunos from "../screens/Alunos/StackAlunos";

const Drawer = createDrawerNavigator()
export default function DrawerRoutes() {
    return(
        <Drawer.Navigator initialRouteName="Alunos">
            <Drawer.Screen name="Alunos" component={StackAlunos}/>
        </Drawer.Navigator>
    )
}