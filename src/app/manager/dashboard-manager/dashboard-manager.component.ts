import { Component } from '@angular/core';
import { RendezvousService } from 'src/app/services/rendezvous.service';

@Component({
  selector: 'app-dashboard-manager',
  templateUrl: './dashboard-manager.component.html',
  styleUrls: ['./dashboard-manager.component.css']
})
export class DashboardManagerComponent {

  constructor(private rendezVousService: RendezvousService) { }

  downloadRendezVousReport() {
    this.rendezVousService.exportRendezVousToCsv().subscribe((data) => {
      const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'rendezvous_report.csv'; // Set the desired file name here
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }

}
