<script>
  import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
  } from 'sveltestrap';

  let isOpen = false;
  const handleUpdate = (e) => isOpen = e.detail.isOpen;
</script>

<Navbar color="primary" light expand="md" class="julietta-massie navbar-font" style="padding-bottom: 5px;">
  <NavbarBrand href="/" class="mx-3">
    <img src="./site_icon.png" width="36" alt="brand" style="margin-right: 10px;"/>
    <span class="navbar-item">Wedding Pictures</span>
  </NavbarBrand>
  <NavbarToggler color="primary" on:click={() => (isOpen = !isOpen)} />
  <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
    <Nav class="ms-auto" navbar style="margin-right: 15px;">
      <NavItem>
        <NavLink href="/#/slideshow">
          <span class="navbar-item">Slideshow</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/#/photos">
          <span class="navbar-item">All Photos</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/">
          <span class="navbar-item">Upload</span>
        </NavLink>
      </NavItem>
      </Nav>
  </Collapse>
</Navbar>

<style>
  .navbar-item {
    font-size: 1.5rem;
    color: honeydew;
  }
</style>