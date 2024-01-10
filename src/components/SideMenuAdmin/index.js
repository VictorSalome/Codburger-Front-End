import React from 'react'
import { Container, ItemContainer, ListLink } from './styles'
import listLinks from '../../components/SideMenuAdmin/menu-list'
import LogoutIcon from '@mui/icons-material/Logout'
import { useUser } from '../../hooks/UserContext'
import paths from '../../constants/paths'





export const SideMenuAdmin = () => {
  const { logout } = useUser()



  return (
    <Container>
      <hr></hr>
      {listLinks.map(item => (
        <ItemContainer key={item.id} isActive={true}>
          <item.icon className="icon" />
          <ListLink to={item.link}>{item.label}</ListLink>
        </ItemContainer>
      ))}
      <hr></hr>
      <ItemContainer style={{ position: 'absolute', bottom: '30px' }} >
        <LogoutIcon style={{ color: '#FFFFFF' }} />
        <ListLink to={paths.Login} onClick={logout} >Sair</ListLink>
      </ItemContainer>

    </Container>

  )
}

