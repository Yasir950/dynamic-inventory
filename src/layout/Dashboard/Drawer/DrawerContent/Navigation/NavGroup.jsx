import React, { useState } from 'react';
import PropTypes from 'prop-types';
// material-ui
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

// project import
import NavItem from './NavItem';
import { useGetMenuMaster } from 'api/menu';

const colors = {
  sidebarBg: '#FF9D00', // Sidebar header background (orange)
  textPrimary: '#FFFFFF', // Text color (white)
  textSecondary: '#F5F5F5', // Submenu text
  iconColor: '#FFFFFF', // Icon color
  collapseBg: '#FFF3E0', // Background for submenu items
};
export default function NavGroup({ item }) {
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  const [openMenus, setOpenMenus] = useState({}); // Track open/close state of collapsible menus

  const handleCollapseToggle = (menuId) => {
    setOpenMenus((prevState) => ({
      ...prevState,
      [menuId]: !prevState[menuId],
    }));
  };

  const navCollapse = item.children?.map((menuItem) => {
    switch (menuItem.type) {
      case 'collapse':
        return (
          <React.Fragment key={menuItem.id}>
           <NavItem
                    key={menuItem.id}
                    item={menuItem}
                    level={1}
                    sx={{
                      color: colors.textSecondary,
                      '&:hover': { color: colors.textPrimary },
                    }}
                  />
            <Collapse in={openMenus[menuItem.id]} timeout="auto" unmountOnExit>
              <List
                component="div"
                disablePadding
                sx={{
                  backgroundColor: colors.collapseBg,
                  pl: 3,
                }}
              >
                {menuItem.children?.map((child) => (
                  <NavItem
                    key={child.id}
                    item={child}
                    level={2}
                    sx={{
                      color: colors.textSecondary,
                      '&:hover': { color: colors.textPrimary },
                    }}
                  />
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        );
      case 'item':
        return <NavItem key={menuItem.id} item={menuItem} level={1} />;
      default:
        return (
          <Typography key={menuItem.id} variant="h6" color="error" align="center">
            Fix - Group Collapse or Items
          </Typography>
        );
    }
  });

  return (
    <List
      subheader={
        item.title &&
        drawerOpen && (
          <Box sx={{ pl: 3, mb: 1.5 }}>
            <Typography variant="subtitle2" color="textSecondary">
              {item.title}
            </Typography>
          </Box>
        )
      }
      sx={{ mb: drawerOpen ? 1.5 : 0, py: 0, zIndex: 0 }}
    >
      {navCollapse}
    </List>
  );
}

NavGroup.propTypes = { item: PropTypes.object };
