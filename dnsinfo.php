<?php
session_start();
echo "<div class='lookupinfo'>";
  echo "<div class='lookuprow'>";
    echo "<div class='lookupnarrow'>";
      echo "Domain name: ";
    echo "</div>";
      echo $_SESSION['domainname'];
  echo "</div>";
  echo "<div class='lookuprow'>";
    echo "<div class='lookupnarrow'>";
      echo "A record: ";
    echo "</div>";
    echo $_SESSION['domainip'];
  echo "</div>";
echo "</div>";
?>
