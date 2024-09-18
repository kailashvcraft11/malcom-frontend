import {Component, Inject, OnInit} from '@angular/core';
import {ApiService} from '../../../services/api.service';
import {ResponseInterface} from '../../../interfaces/response.interface';
import {ResponsesService} from '../../../services/responses.service';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Component({
    selector: 'app-form-in-body-results',
    templateUrl: './form-in-body-results.component.html',
    styleUrls: ['./form-in-body-results.component.sass']
})
export class FormInBodyResultsComponent implements OnInit {
    public weight: string;
    public leanMass: string;
    public skeletalMuscleMass: string;
    public leanBodyMass: string;
    public dryLeanMass: string;
    public fatMass: string;
    public fatPercentage: string;
    public visceralFat: string;
    public totalBodyFatMass: string;
    public ecwTBWRatio: string;
    public customColors = [
        {
            name: 'lbs',
            value: '#16BECF'
        },
        {
            name: '%',
            value: '#792B8A'
        }
    ];
    public water = [
        {
            name: 'Water',
            series: [
                {
                    name: 'Intracellular Water',
                    value: 0
                },
                {
                    name: 'Extracellular Water',
                    value: 0
                }
            ]
        }
    ];
    public waterColors = [
        {
            name: 'Intracellular Water',
            value: '#792B8A'
        },
        {
            name: 'Extracellular Water',
            value: '#16BECF'
        }
    ];
    public segmentLean = [
        {
            name: 'Right Arm',
            series: [
                {
                    name: 'lbs',
                    value: 0
                },
                {
                    name: '%',
                    value: 0
                }
            ]
        },
        {
            name: 'Left Arm',
            series: [
                {
                    name: 'lbs',
                    value: 0
                },
                {
                    name: '%',
                    value: 0
                }
            ]
        },
        {
            name: 'Trunk',
            series: [
                {
                    name: 'lbs',
                    value: 0
                },
                {
                    name: '%',
                    value: 0
                }
            ]
        },
        {
            name: 'Right Leg',
            series: [
                {
                    name: 'lbs',
                    value: 0
                },
                {
                    name: '%',
                    value: 0
                }
            ]
        },
        {
            name: 'Left Leg',
            series: [
                {
                    name: 'lbs',
                    value: 0
                },
                {
                    name: '%',
                    value: 0
                }
            ]
        }
    ];
    public segmentFat = [
        {
            name: 'Right Arm',
            series: [
                {
                    name: 'lbs',
                    value: 0
                },
                {
                    name: '%',
                    value: 0
                }
            ]
        },
        {
            name: 'Left Arm',
            series: [
                {
                    name: 'lbs',
                    value: 0
                },
                {
                    name: '%',
                    value: 0
                }
            ]
        },
        {
            name: 'Trunk',
            series: [
                {
                    name: 'lbs',
                    value: 0
                },
                {
                    name: '%',
                    value: 0
                }
            ]
        },
        {
            name: 'Right Leg',
            series: [
                {
                    name: 'lbs',
                    value: 0
                },
                {
                    name: '%',
                    value: 0
                }
            ]
        },
        {
            name: 'Left Leg',
            series: [
                {
                    name: 'lbs',
                    value: 0
                },
                {
                    name: '%',
                    value: 0
                }
            ]
        }
    ];
    public scanColumns = ['date', 'weight', 'skeletal_muscle_mass', 'percent_body_fat', 'ecw_tbw'];
    public scans = [];
    public messageColumns = ['date', 'message'];
    public messages = [];
    public alert = false;

    constructor(
        private _api: ApiService,
        private _responsesService: ResponsesService,
        @Inject(LOCAL_STORAGE) private _storage: WebStorageService
    ) {
    }

    ngOnInit() {
        const user = JSON.parse(this._storage.get('malcolmCurrentUser'));
        const userID = user.user.id;
        const uniqueID = user.user.unique_id;

        this._api.getUserNotifications(userID).subscribe((response: ResponseInterface) => {
            if (response.success) {
                this.messages = response.result;
            }
        });

        this._api.getAllInBodyResults(uniqueID).subscribe((response: ResponseInterface) => {
            if (response.success) {
                this.scans = response.result;
            }
        });

        this._responsesService.all().subscribe(result => {
            this.weight = result['Weight'];
            this.skeletalMuscleMass = result['SMM(SkeletalMuscleMass)'];
            this.leanBodyMass = result['LBM(LeanBodyMass)'];
            this.dryLeanMass = result['DLM(DryLeanMass)'];
            this.fatPercentage = result['PBF(PercentBodyFat)'];
            this.visceralFat = result['VFA(VisceralFatArea)'];
            this.totalBodyFatMass = result['BFM(BodyFatMass)'];
            this.ecwTBWRatio = result['ECW/TBW'];

            // Segment Lean Right Arm
            this.segmentLean[0].series[0].value = result['LBMofRightArm'];
            this.segmentLean[0].series[1].value = result['LBM%ofRightArm'];

            // Segment Lean Left Arm
            this.segmentLean[1].series[0].value = result['LBMofLeftArm'];
            this.segmentLean[1].series[1].value = result['LBM%ofLeftArm'];

            // Segment Lean Trunk
            this.segmentLean[2].series[0].value = result['LBMofTrunk'];
            this.segmentLean[2].series[1].value = result['LBM%ofTrunk'];

            // Segment Lean Right Leg
            this.segmentLean[3].series[0].value = result['LBMofRightLeg'];
            this.segmentLean[3].series[1].value = result['LBM%ofRightLeg'];

            // Segment Lean Left Leg
            this.segmentLean[4].series[0].value = result['LBMofLeftLeg'];
            this.segmentLean[4].series[1].value = result['LBM%ofLeftLeg'];

            // Segment Fat Right Arm
            this.segmentFat[0].series[0].value = result['BFMofRightArm'];
            this.segmentFat[0].series[1].value = result['BFM%ofRightArm'];

            // Segment Fat Left Arm
            this.segmentFat[1].series[0].value = result['BFMofLeftArm'];
            this.segmentFat[1].series[1].value = result['BFM%ofLeftArm'];

            // Segment Fat Trunk
            this.segmentFat[2].series[0].value = result['BFMofTrunk'];
            this.segmentFat[2].series[1].value = result['BFM%ofTrunk'];

            // Segment Fat Right Leg
            this.segmentFat[3].series[0].value = result['BFMofRightLeg'];
            this.segmentFat[3].series[1].value = result['BFM%ofRightLeg'];

            // Segment Fat Left Leg
            this.segmentFat[4].series[0].value = result['BFMofLeftLeg'];
            this.segmentFat[4].series[1].value = result['BFM%ofLeftLeg'];

            // Water
            this.water[0].series[0].value = parseFloat(result['ICW(IntracellularWater)']);
            this.water[0].series[1].value = parseFloat(result['ECW(ExtracellularWater)']);
        });
    }

}
