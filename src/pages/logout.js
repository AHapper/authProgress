function Logout() {
    return auth.currentUser && (
      <Button variant="outlined" color="primary" onClick={() => auth.signOut()}>Sign Out</Button>
    )
  }