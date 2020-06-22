import {Component, AfterViewInit, ViewChild, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';
import {InstallerInfo} from '../installer-card/installer-info';

@Component({
    selector: 'app-installer-map',
    templateUrl: './installer-map.component.html',
    styleUrls: ['./installer-map.component.scss']
})
export class InstallerMapComponent implements AfterViewInit, OnChanges {
    @ViewChild('mapContainer') gmap: ElementRef;
    @Input() installers: InstallerInfo[];
    @Input() postcode: string;
    map: google.maps.Map;
    markers;
    bounds = new google.maps.LatLngBounds();
    geocoder = new google.maps.Geocoder();
    userLocationMarker;

    ngAfterViewInit() {
        this.mapInitializer();
    }

    mapInitializer() {
        this.map = new google.maps.Map(this.gmap.nativeElement);
        this.convertPostcodeToCoordinatesThenSetMarker();
        this.setInstallerMarkers();
        this.map.fitBounds(this.bounds);
    }

    setInstallerMarkers() {
        this.markers = this.installers.map(installer => {
                const coordinates = new google.maps.LatLng(installer.latitude, installer.longitude);
                const marker = new google.maps.Marker({
                    position: coordinates,
                    map: this.map,
                    title: installer.registeredName
                });
                this.bounds.extend(marker.getPosition());
                marker.addListener('click', () => {
                    window.parent.postMessage(installer.id, '*');
                });
                return marker;
            }
        );
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.map) {
            this.removeAllInstallerMarkers();
            this.bounds = new google.maps.LatLngBounds();
            this.bounds.extend(this.userLocationMarker.getPosition());
            this.setInstallerMarkers();
            this.map.fitBounds(this.bounds);
        }
    }

    removeAllInstallerMarkers() {
        this.markers.forEach(marker => marker.setMap(null));
        this.markers = [];
    }

    convertPostcodeToCoordinatesThenSetMarker() {
        this.geocoder.geocode({'address': this.postcode}, this.setUserLocationMarker);
    }

    setUserLocationMarker = (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
            this.userLocationMarker = new google.maps.Marker({
                position: results[0].geometry.location,
                map: this.map,
                title: "Your location",
                icon: {
                    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                    scale: 5,
                    strokeWeight: 2,
                    strokeColor: "#006280",
                    fillColor: "#006280",
                    fillOpacity: 1
                }
            });
            this.bounds.extend(this.userLocationMarker.getPosition());
            this.map.fitBounds(this.bounds);
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    }
}
