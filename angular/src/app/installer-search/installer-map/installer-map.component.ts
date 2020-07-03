import {
    Component,
    AfterViewInit,
    ViewChild,
    ElementRef,
    Input,
    OnChanges,
    SimpleChanges,
    Output,
    EventEmitter
} from '@angular/core';
import {InstallerInfo} from '../installer-card/installer-info';

@Component({
    selector: 'app-installer-map',
    templateUrl: './installer-map.component.html',
    styleUrls: ['./installer-map.component.scss']
})
/* Here we create our custom google maps component, instead of using the off the shelf component
provided by the @angular/google-maps library. This is because the google-maps library requires
a more recent version of angular, which breaks our website. */
export class InstallerMapComponent implements AfterViewInit, OnChanges {
    @ViewChild('mapContainer') gmap: ElementRef;
    @Input() installers: InstallerInfo[];
    @Input() postcode: string;
    @Input() hoveredInstallerCardId: number;
    @Output() markerClick = new EventEmitter<number>();
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
                    title: installer.registeredName,
                    icon: '/dist/assets/images/icons/inactive-marker.svg',
                });
                this.bounds.extend(marker.getPosition());
                marker.addListener('click', () => {
                    this.markerClick.next(installer.id);
                });
                marker.set('installerId', installer.id);
                return marker;
            }
        );
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.map && this.propertyHasChanged('installers', changes)) {
            this.updateMapAndAllMarkers();
        }
        if (this.propertyHasChanged('hoveredInstallerCardId', changes)) {
            this.updateHoveredInstallerCardMarkerIcon(changes);
        }
    }

    updateMapAndAllMarkers() {
        this.bounds = new google.maps.LatLngBounds();
        this.resetInstallerMarkers();
        this.resetUserLocationMarker();
        this.map.fitBounds(this.bounds);
    }

    updateHoveredInstallerCardMarkerIcon(changes) {
        if (this.hasStartedHoveringInstallerCard()) {
            this.changeMarkerIconToActiveByInstallerId(this.hoveredInstallerCardId);
        } else if (this.hasFinishedHoveringInstallerCard(changes)) {
            const noLongerHoveredInstallerCardId = changes['hoveredInstallerCardId'].previousValue;
            this.changeMarkerIconToInactiveByInstallerId(noLongerHoveredInstallerCardId);
        }
    }

    hasStartedHoveringInstallerCard() {
        return !!this.hoveredInstallerCardId;
    }

    hasFinishedHoveringInstallerCard(changes) {
        return this.markers && changes['hoveredInstallerCardId'].previousValue && !changes['hoveredInstallerCardId'].currentValue;
    }

    changeMarkerIconToActiveByInstallerId(installerId: number) {
        const hoverMarker = this.getMarkerByInstallerId(installerId);
        this.changeMarkerIconToActive(hoverMarker);
    }

    changeMarkerIconToInactiveByInstallerId(installerId: number) {
        const hoverMarker = this.getMarkerByInstallerId(installerId);
        this.changeMarkerIconToInactive(hoverMarker);
    }

    getMarkerByInstallerId(installerId: number) {
        return this.markers.find(marker => {
            return marker.get('installerId') === installerId;
        });
    }

    changeMarkerIconToActive(marker) {
        marker.setIcon('/dist/assets/images/icons/active-marker.svg');
    }

    changeMarkerIconToInactive(marker) {
        marker.setIcon('/dist/assets/images/icons/inactive-marker.svg');
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

    resetUserLocationMarker() {
        this.userLocationMarker.setMap(null);
        this.convertPostcodeToCoordinatesThenSetMarker();
    }

    resetInstallerMarkers() {
        this.removeAllInstallerMarkers();
        this.setInstallerMarkers();
    }

    propertyHasChanged(propertyName: string, changes: SimpleChanges) {
        return changes[propertyName] && changes[propertyName].previousValue !== changes[propertyName].currentValue;
    }
}
