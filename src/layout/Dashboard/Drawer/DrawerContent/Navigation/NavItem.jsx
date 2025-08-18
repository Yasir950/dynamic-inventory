import PropTypes from 'prop-types';
import { forwardRef, useState, useEffect } from 'react';
import { Link, useLocation, matchPath } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

// project import
import { handlerActiveItem, useGetMenuMaster } from 'api/menu';
import { useDispatch } from 'react-redux';
import { changeForm, clearData, closeForm } from 'redux/slices/userSlice';

export default function NavItem({ item, level }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;
  const openItem = menuMaster.openedItem;

  const { pathname } = useLocation();
  const isSelected = !!matchPath({ path: item.url, end: false }, pathname) || openItem === item.id;

  const [isOpen, setIsOpen] = useState(false); // State for collapse

  // Handle collapse toggle
  const handleToggle = (id) => {
    setIsOpen(!isOpen);
    handlerActiveItem(id); // Optional: Mark the parent item as active
  };

  useEffect(() => {
    if (pathname === item.url) handlerActiveItem(item.id);
    // eslint-disable-next-line
  }, [pathname]);

  const textColor = 'text.primary';
  const iconSelectedColor = '#ffffff';

  const Icon = item.icon;
  const itemIcon = item.icon ? <Icon style={{ fontSize: drawerOpen ? '1rem' : '1.25rem' }} /> : false;
  // Render child items if type is 'collapse'
  const renderChildren = () => {
    if (item.children && item.type === 'collapse') {
      return (
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          {item.children.map((child) => (
            <NavItem key={child.id} item={child} level={level + 1} />
          ))}
        </Collapse>
      );
    }
    return null;
  };
  const handleCloseForm = () => {
    dispatch(closeForm())
    dispatch(clearData())
  }
  return (
    <>
      <ListItemButton
         component={item.type === 'item' ? forwardRef((props, ref) => <Link ref={ref} {...props} to={item.url} />) : forwardRef((props, ref) => <p ref={ref} {...props}  />)}
        disabled={item.disabled}
        onClick={item.type === 'collapse' ? () => handleToggle(item.id) : () => {handlerActiveItem(item.id); handleCloseForm();}}
        selected={isSelected}
        sx={{
          zIndex: 1201,
          margin: '8px 22px',
          pl: drawerOpen ? `${level * 15}px` : 1.5,
          py: !drawerOpen && level === 1 ? 1.25 : 1,
          borderRadius: '8px',
          ...(drawerOpen && {
            '&:hover': {
              bgcolor: level === 1 ?'#FF8900':"#FFF",
              color: '#fff',
            },
            '&.Mui-selected': {
              bgcolor:level === 1 ?'#FF8900':"#FFF",
              color: iconSelectedColor,
              '&:hover': {
                color: iconSelectedColor,
                bgcolor:level === 1 ?'#FF8900':"#FFF",
              },
            },
          }),
          ...(!drawerOpen && {
            '&:hover': {
              bgcolor: '#FF8900',
            },
            '&.Mui-selected': {
              '&:hover': {
                bgcolor: '#FF8900',
              },
              bgcolor: '#FF8900',
            },
          }),
        }}
      >
        {itemIcon && (
          <ListItemIcon
            sx={{
              minWidth: 28,
              color: isSelected ? iconSelectedColor : textColor,
              ...(!drawerOpen && {
                borderRadius: 1.5,
                width: 36,
                height: 36,
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover': {
                  bgcolor: '#FF8900',
                },
              }),
              ...(!drawerOpen &&
                isSelected && {
                  bgcolor: '#FF8900',
                  '&:hover': {
                    bgcolor: '#FF8900',
                  },
                }),
            }}
          >
            
            {itemIcon}
          </ListItemIcon>
        )}
        {(drawerOpen || (!drawerOpen && level !== 1)) && (
          <ListItemText
            primary={
              <Typography
                variant="h6"
                sx={{ color: level == 1 ? (isSelected ? iconSelectedColor : textColor) : isSelected ? '#000000' : '#00000066' }}
              >
                {item.title}
              </Typography>
            }
          />
        )}
        {item.type === 'collapse' && (isOpen ? <ExpandLess /> : <ExpandMore />)}
        {(drawerOpen || (!drawerOpen && level !== 1)) && item.chip && (
          <Chip
            color={item.chip.color}
            variant={item.chip.variant}
            size={item.chip.size}
            label={item.chip.label}
            avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
          />
        )}
      </ListItemButton>
      {renderChildren()}
    </>
  );
}

NavItem.propTypes = { item: PropTypes.object, level: PropTypes.number };
